// sinners.js, identities.js, sinnerEgoList.js 및 pako 라이브러리가 먼저 HTML에 로드되어 있어야 합니다.

const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
let currentFilter = 'all'; 

// 수감자별로 추출된 에고를 저장할 공간
let fixedEgos = {};

// 오디오 설정
if (volumeSlider) {
    volumeSlider.oninput = (e) => { bgm.volume = e.target.value; };
}
if (muteBtn) {
    muteBtn.onclick = () => {
        bgm.muted = !bgm.muted;
        muteBtn.innerText = bgm.muted ? "🔇 MUTE" : "🔊 ON";
    };
}

// 시작 화면 버튼
const startBtn = document.getElementById('start-btn');
if (startBtn) {
    startBtn.onclick = () => {
        bgm.play().catch(() => {});
        document.getElementById('main-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        renderGrid(); 
    };
}

// 초기 그리드 렌더링
function renderGrid() {
    const grid = document.getElementById('sinner-grid');
    if (!grid) return;
    grid.innerHTML = '';
    sinners.forEach((s) => {
        const card = document.createElement('div');
        card.className = 'sinner-card';
        card.style.cursor = 'default'; 
        card.innerHTML = `
            <div class="rank-stars" id="stars-${s.id}"></div>
            <div class="img-box" id="slot-${s.id}">
                <img src="images/${s.folder}/logo.png" class="logo-img">
            </div>
            <div class="sinner-label">${s.name}</div>
        `;
        grid.appendChild(card);
    });
}

// 추출 버튼 클릭 시 실행
const spinBtn = document.getElementById('spin-all-btn');
if (spinBtn) {
    spinBtn.onclick = function() {
        this.disabled = true;
        let finished = 0;

        sinners.forEach((s, i) => {
            const slot = document.getElementById(`slot-${s.id}`);
            const label = slot ? slot.nextElementSibling : null; 
            const starBox = document.getElementById(`stars-${s.id}`);
            const card = slot ? slot.parentElement : null;
            
            // 1. 추출 시작 시 이 수감자가 가질 에고 세트 결정
            const sinnerIdx = parseInt(s.id) - 1;
            const egoData = sinnerEgoList[sinnerIdx];
            
            fixedEgos[s.id] = egoData.map(gradeList => {
                if (gradeList && gradeList.length > 0) {
                    const randomIdx = Math.floor(Math.random() * gradeList.length);
                    return gradeList[randomIdx].name;
                }
                return "-";
            });

            // 필터에 따른 인격 리스트 준비
            let list = identities[i].filter(item => currentFilter === '3star' ? item.rank === 3 : true);
            
            // 룰렛 애니메이션
            let count = 0;
            const timer = setInterval(() => {
                const selected = list[Math.floor(Math.random() * list.length)];
                
                if (slot) slot.innerHTML = `<img src="images/${s.folder}/${s.folder}_${selected.code}.png">`;
                if (label) label.innerText = selected.name;
                if (starBox) starBox.innerText = '★'.repeat(selected.rank);
                
                if (++count > 15) {
                    clearInterval(timer);
                    finished++;
                    
                    if (label) label.style.color = selected.rank === 3 ? "#ffc400" : "#fff";
                    
                    // 추출 완료된 카드 클릭 이벤트
                    if (card) {
                        card.style.cursor = 'pointer';
                        card.onclick = () => showFixedEgoDetails(s.id, s.name);
                    }

                    // 모든 수감자 추출 완료 시 복사 버튼 활성화
                    if (finished === sinners.length) {
                        this.disabled = false;
                        const copyBtn = document.getElementById('copy-deck-btn');
                        if (copyBtn) {
                            copyBtn.style.display = 'inline-block';
                            copyBtn.disabled = false;
                            copyBtn.style.pointerEvents = 'auto';
                        }
                    }
                }
            }, 80);
        });
    };
}

// 에고 모달 출력 함수
function showFixedEgoDetails(sinnerId, sinnerName) {
    const modal = document.getElementById('ego-modal');
    const content = document.getElementById('ego-content');
    const nameLabel = document.getElementById('ego-sinner-name');
    
    if (!modal || !content || !nameLabel) return;

    nameLabel.innerText = `${sinnerName} 장착 에고`;
    content.innerHTML = '';
    
    const egoSet = fixedEgos[sinnerId];
    const gradeSymbols = ['Z', 'T', 'H', 'W', 'A']; 
    const gradeNames = ['zayin', 'teth', 'he', 'waw', 'aleph'];

    if (egoSet) {
        egoSet.forEach((egoName, i) => {
            const egoDiv = document.createElement('div');
            egoDiv.className = `ego-list-item grade-${gradeNames[i]}`;
            
            egoDiv.innerHTML = `
                <span class="ego-symbol">${gradeSymbols[i]}</span>
                <span class="ego-name" style="${egoName === '-' ? 'color:#444' : ''}">${egoName}</span>
            `;
            content.appendChild(egoDiv);
        });
    }
    
    modal.style.display = 'flex';
}

function closeEgoModal() {
    const modal = document.getElementById('ego-modal');
    if (modal) modal.style.display = 'none';
}

// 필터 및 기타 버튼
const filterAll = document.getElementById('filter-all');
const filter3star = document.getElementById('filter-3star');

if (filterAll) {
    filterAll.onclick = function() { 
        currentFilter = 'all'; 
        this.classList.add('active'); 
        if (filter3star) filter3star.classList.remove('active'); 
    };
}
if (filter3star) {
    filter3star.onclick = function() { 
        currentFilter = '3star'; 
        this.classList.add('active'); 
        if (filterAll) filterAll.classList.remove('active'); 
    };
}

const goBackBtn = document.getElementById('go-back');
if (goBackBtn) goBackBtn.onclick = () => location.reload();

// -------------------------------------------------------------
// [비트 설정 함수]
// -------------------------------------------------------------
function setBits(bitArray, start, end, value) {
    let length = end - start + 1;
    let binaryValue = Number(value).toString(2).padStart(length, '0');
    
    // 만약 변환된 이진수가 지정 영역보다 길 경우 자름
    if (binaryValue.length > length) {
        binaryValue = binaryValue.slice(-length);
    }

    for (let i = 0; i < length; i++) {
        bitArray[start + i] = binaryValue[i];
    }
}

// -------------------------------------------------------------
// [덱 코드 생성 연산 함수]
// -------------------------------------------------------------
function generateRawBitString() {
    // 수감자 12명 * 46비트 = 552비트 + 8비트 패딩 = 560비트
    let totalBits = new Array(560).fill('0');

    sinners.forEach((s, i) => {
        let startBit = i * 46; // 각 수감자의 시작 비트 오프셋 (0, 46, 92...)

        // 1) 인격 (캐릭터 내 인격의 출시 순서)
        const label = document.getElementById(`slot-${s.id}`)?.nextElementSibling;
        const currentName = label ? label.innerText.trim() : ""; 
        const foundIdentity = identities[i]?.find(idy => idy.name.trim() === currentName);
        
        let idyNo = foundIdentity ? foundIdentity.no : 1;

        // 16 이상인 경우 4~8비트(0-index: 3~7) 5비트 영역 사용
        // 15 이하인 경우 5~8비트(0-index: 4~7) 4비트 영역 사용
        if (idyNo >= 16) {
            setBits(totalBits, startBit + 3, startBit + 7, idyNo);
        } else {
            setBits(totalBits, startBit + 4, startBit + 7, idyNo);
        }

        // 2) 편성 순서 (9~12 비트 -> 0-index: 8~11)
        setBits(totalBits, startBit + 8, startBit + 11, i + 1);

        // 3) 에고 (ZAYIN, TETH, HE, WAW)
        const egoSet = typeof fixedEgos !== 'undefined' ? fixedEgos[s.id] : null;
        const egoData = typeof sinnerEgoList !== 'undefined' ? sinnerEgoList[i] : null;

        if (egoSet && egoData) {
            const getEgoNo = (gradeIdx, egoName) => {
                if (!egoName || egoName === "-") return 0;
                const found = egoData[gradeIdx]?.find(e => e.name.trim() === egoName.trim());
                return found ? found.no : 0;
            };

            // ZAYIN : 16~19 비트 (0-index: 15~18)
            setBits(totalBits, startBit + 15, startBit + 18, getEgoNo(0, egoSet[0])); 
            // TETH  : 23~26 비트 (0-index: 22~25)
            setBits(totalBits, startBit + 22, startBit + 25, getEgoNo(1, egoSet[1])); 
            // HE    : 30~33 비트 (0-index: 29~32)
            setBits(totalBits, startBit + 29, startBit + 32, getEgoNo(2, egoSet[2])); 
            // WAW   : 37~40 비트 (0-index: 36~39)
            setBits(totalBits, startBit + 36, startBit + 39, getEgoNo(3, egoSet[3])); 
        }
    });

    const bitString = totalBits.join("");

    // --- [파이썬 encode_deck_code 변환 연산과 1:1 매핑] ---

    // 1) 0)을 bit 형식에서 byte 형식으로 변환
    let bytes = new Uint8Array(bitString.length / 8);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(bitString.substr(i * 8, 8), 2);
    }

    // 2) 1)을 base64를 이용해 encode
    let binStr1 = '';
    for (let i = 0; i < bytes.length; i++) {
        binStr1 += String.fromCharCode(bytes[i]);
    }
    let b64_encoded = btoa(binStr1);

    // 3) 2)를 gzip를 이용해 compress
    if (typeof pako === 'undefined') {
        throw new Error("pako 라이브러리가 로드되지 않았습니다.");
    }
    let compressor = pako.gzip(b64_encoded);

    // 4) 3)을 base64를 이용해 encode
    let binStr2 = '';
    for (let i = 0; i < compressor.length; i++) {
        binStr2 += String.fromCharCode(compressor[i]);
    }
    let deck_code = btoa(binStr2);

    return deck_code;
}

// -------------------------------------------------------------
// [클립보드 복사 처리]
// -------------------------------------------------------------
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert("덱 코드가 클립보드에 복사되었습니다!\n\n" + text);
        }).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert("덱 코드가 클립보드에 복사되었습니다!\n\n" + text);
    } catch (err) {
        alert("복사 실패: 수동으로 복사해주세요.\n" + text);
    }
    document.body.removeChild(textArea);
}

// -------------------------------------------------------------
// [버튼 이벤트 바인딩]
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-deck-btn');
    if (copyBtn) {
        copyBtn.onclick = function() {
            try {
                const deckCode = generateRawBitString();
                copyToClipboard(deckCode);
            } catch (e) {
                console.error("덱 코드 생성 오류:", e);
                alert("코드 생성 중 오류가 발생했습니다.\nHTML 파일에 pako 라이브러리가 포함되어 있는지 확인해주세요.");
            }
        };
    }
});
