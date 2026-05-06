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
    const gradeSymbols = ['T', 'D', 'H', 'W', 'A']; 
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
