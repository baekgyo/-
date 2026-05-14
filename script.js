// sinners.js가 먼저 로드되어 있어야 합니다.
// 변수 중복 선언 방지를 위해 sinners = [...] 같은 코드는 넣지 않았습니다.

const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
let currentFilter = 'all'; 

// 수감자별로 추출된 에고를 저장할 공간
let fixedEgos = {};

// 오디오 설정
volumeSlider.oninput = (e) => { bgm.volume = e.target.value; };
muteBtn.onclick = () => {
    bgm.muted = !bgm.muted;
    muteBtn.innerText = bgm.muted ? "🔇 MUTE" : "🔊 ON";
};

// 시작 화면 버튼
document.getElementById('start-btn').onclick = () => {
    bgm.play().catch(() => {});
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    renderGrid(); 
};

// 초기 그리드 렌더링 (추출 전에는 클릭 이벤트가 없습니다)
function renderGrid() {
    const grid = document.getElementById('sinner-grid');
    grid.innerHTML = '';
    sinners.forEach((s) => {
        const card = document.createElement('div');
        card.className = 'sinner-card';
        // 기본 상태에서는 클릭 기능이 없도록 설정 (pointer-events: none은 나중에 제거)
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
document.getElementById('spin-all-btn').onclick = function() {
    this.disabled = true;
    let finished = 0;

    sinners.forEach((s, i) => {
        const slot = document.getElementById(`slot-${s.id}`);
        const label = slot.nextElementSibling; 
        const starBox = document.getElementById(`stars-${s.id}`);
        const card = slot.parentElement;
        
        // 1. 추출 시작 시 이 수감자가 가질 에고 세트를 미리 결정
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
            
            slot.innerHTML = `<img src="images/${s.folder}/${s.folder}_${selected.code}.png">`;
            label.innerText = selected.name;
            starBox.innerText = '★'.repeat(selected.rank);
            
            if (++count > 15) {
                clearInterval(timer);
                finished++;
                
                // 결과 색상 적용
                label.style.color = selected.rank === 3 ? "#ffc400" : "#fff";
                
                // 2. 추출이 완료된 카드에만 클릭 이벤트 부여
                card.style.cursor = 'pointer';
                card.onclick = () => showFixedEgoDetails(s.id, s.name);

                if (finished === sinners.length) {
                    this.disabled = false;
                    document.getElementById('copy-deck-btn').style.display = 'inline-block';
                }
            }
        }, 80);
    });
};

// 미리 결정된 에고 세트를 보여주는 함수
function showFixedEgoDetails(sinnerId, sinnerName) {
    const modal = document.getElementById('ego-modal');
    const content = document.getElementById('ego-content');
    const nameLabel = document.getElementById('ego-sinner-name');
    
    nameLabel.innerText = `${sinnerName} 장착 에고`;
    content.innerHTML = '';
    
    const egoSet = fixedEgos[sinnerId];
    const gradeSymbols = ['Z', 'T', 'H', 'W', 'A']; 
    const gradeNames = ['zayin', 'teth', 'he', 'waw', 'aleph'];

    egoSet.forEach((egoName, i) => {
        const egoDiv = document.createElement('div');
        egoDiv.className = `ego-list-item grade-${gradeNames[i]}`;
        
        egoDiv.innerHTML = `
            <span class="ego-symbol">${gradeSymbols[i]}</span>
            <span class="ego-name" style="${egoName === '-' ? 'color:#444' : ''}">${egoName}</span>
        `;
        content.appendChild(egoDiv);
    });
    
    modal.style.display = 'flex';
}

function closeEgoModal() {
    document.getElementById('ego-modal').style.display = 'none';
}

// 필터 및 기타 버튼
document.getElementById('filter-all').onclick = function() { 
    currentFilter = 'all'; this.classList.add('active'); 
    document.getElementById('filter-3star').classList.remove('active'); 
};
document.getElementById('filter-3star').onclick = function() { 
    currentFilter = '3star'; this.classList.add('active'); 
    document.getElementById('filter-all').classList.remove('active'); 
};
document.getElementById('go-back').onclick = () => location.reload();

function setBits(bitArray, start, end, value) {
    // start: 시작 비트 번호 (1부터 시작하는 규격 기준)
    // end: 끝 비트 번호
    // 실제 배열 인덱스는 (번호 - 1)
    let length = end - start + 1;
    let binaryValue = value.toString(2).padStart(length, '0');
    
    for (let i = 0; i < binaryValue.length; i++) {
        bitArray[(start - 1) + i] = binaryValue[i];
    }
}

function generateRawBitString() {
    let totalBits = new Array(560).fill('0');

    sinners.forEach((s, i) => {
        let startBit = i * 46; 

        // 1. 인격 찾기: 이미지 파일명이 아니라 '텍스트 이름'으로 찾기
        const label = document.getElementById(`slot-${s.id}`).nextElementSibling;
        const currentName = label.innerText; // 예: "서부 츠바이 협회 3과 싱클레어"
        
        // identities[i] 배열에서 이름이 똑같은 인격을 찾음
        const idyIdx = identities[i].findIndex(idy => idy.name === currentName) + 1;

        // 인격 순서 (5~8비트) & 편성 순서 (9~12비트)
        setBits(totalBits, startBit + 5, startBit + 8, idyIdx > 0 ? idyIdx : 1);
        setBits(totalBits, startBit + 9, startBit + 12, i + 1);

        // 2. 에고 정보 (no 값 활용)
        const egoSet = fixedEgos[s.id];
        const egoData = sinnerEgoList[i];

        if (egoSet && egoData) {
            const getEgoNo = (gradeIdx, egoName) => {
                if (!egoName || egoName === "-") return 0;
                const found = egoData[gradeIdx].find(e => e.name === egoName);
                return found ? found.no : 0;
            };

            setBits(totalBits, startBit + 16, startBit + 19, getEgoNo(0, egoSet[0])); // ZAYIN
            setBits(totalBits, startBit + 23, startBit + 26, getEgoNo(1, egoSet[1])); // TETH
            setBits(totalBits, startBit + 30, startBit + 33, getEgoNo(2, egoSet[2])); // HE
            setBits(totalBits, startBit + 37, startBit + 40, getEgoNo(3, egoSet[3])); // WAW
        }
    });

    return totalBits.join("");
}

document.getElementById('copy-deck-btn').onclick = function() {
    try {
        const bitString = generateRawBitString();
        
        // 1. 비트 문자열(560자)을 8개씩 끊어서 바이트로 변환
        let byteArray = new Uint8Array(bitString.length / 8);
        for (let i = 0; i < bitString.length; i += 8) {
            byteArray[i / 8] = parseInt(bitString.substring(i, i + 8), 2);
        }

        // 2. 바이트 배열 -> Base64 (1차)
        // btoa는 문자열을 받으므로 변환 과정 필요
        let binaryStr = "";
        for (let i = 0; i < byteArray.length; i++) {
            binaryStr += String.fromCharCode(byteArray[i]);
        }
        let b64_1 = btoa(binaryStr);
        
        // 3. Gzip 압축 (문자열 b64_1을 압축해야 함)
        const encoder = new TextEncoder();
        const compressed = pako.gzip(encoder.encode(b64_1)); 
        
        // 4. 최종 Base64 변환
        let finalBinary = "";
        for (let i = 0; i < compressed.length; i++) {
            finalBinary += String.fromCharCode(compressed[i]);
        }
        let finalDeckCode = btoa(finalBinary);

        navigator.clipboard.writeText(finalDeckCode).then(() => {
            alert("덱 코드가 복사되었습니다!");
        });
    } catch (e) {
        console.error(e);
        alert("코드 생성 실패: " + e.message);
    }
};
