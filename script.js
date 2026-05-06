const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
let currentFilter = 'all'; 

// 설정 및 화면 전환
volumeSlider.oninput = (e) => { bgm.volume = e.target.value; };
muteBtn.onclick = () => {
    bgm.muted = !bgm.muted;
    muteBtn.innerText = bgm.muted ? "🔇 MUTE" : "🔊 ON";
};

document.getElementById('start-btn').onclick = () => {
    bgm.play().catch(() => {});
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    renderGrid(); 
};

// 수감자 그리드 생성
function renderGrid() {
    const grid = document.getElementById('sinner-grid');
    grid.innerHTML = '';
    sinners.forEach((s) => {
        const card = document.createElement('div');
        card.className = 'sinner-card';
        card.style.cursor = 'pointer'; 
        card.innerHTML = `
            <div class="rank-stars" id="stars-${s.id}"></div>
            <div class="img-box" id="slot-${s.id}">
                <img src="images/${s.folder}/logo.png" class="logo-img">
            </div>
            <div class="sinner-label">${s.name}</div>
        `;
        // 클릭 시 에고 팝업 실행
        card.onclick = () => showRandomEgoDetails(s);
        grid.appendChild(card);
    });
}

// 등급별 랜덤 에고 추출 및 표시
function showRandomEgoDetails(sinner) {
    const modal = document.getElementById('ego-modal');
    const content = document.getElementById('ego-content');
    const nameLabel = document.getElementById('ego-sinner-name');
    
    nameLabel.innerText = `${sinner.name} 장착 에고`;
    content.innerHTML = '';
    
    // 수감자 ID를 기반으로 데이터 인덱스 매칭 (01 -> 0)
    const sinnerIdx = parseInt(sinner.id) - 1;
    const egoData = sinnerEgoList[sinnerIdx]; 

    if (egoData) {
        const gradeSymbols = ['T', 'D', 'H', 'W', 'A']; 
        const gradeNames = ['zayin', 'teth', 'he', 'waw', 'aleph'];

        // ZAYIN(0)부터 ALEPH(4)까지 순회
        egoData.forEach((gradeList, i) => {
            const egoDiv = document.createElement('div');
            egoDiv.className = `ego-list-item grade-${gradeNames[i]}`;
            
            let selectedEgoName = "-";
            
            // 해당 등급에 에고가 존재하면 무작위 선택[cite: 2]
            if (gradeList && gradeList.length > 0) {
                const randomIdx = Math.floor(Math.random() * gradeList.length);
                selectedEgoName = gradeList[randomIdx].name; 
            }

            egoDiv.innerHTML = `
                <span class="ego-symbol">${gradeSymbols[i]}</span>
                <span class="ego-name" style="${selectedEgoName === '-' ? 'color:#444' : ''}">${selectedEgoName}</span>
            `;
            content.appendChild(egoDiv);
        });
    }
    modal.style.display = 'flex';
}

function closeEgoModal() {
    document.getElementById('ego-modal').style.display = 'none';
}

// 룰렛 시작 버튼 로직
document.getElementById('spin-all-btn').onclick = function() {
    this.disabled = true;
    let finished = 0;
    sinners.forEach((s, i) => {
        const slot = document.getElementById(`slot-${s.id}`);
        const label = slot.nextElementSibling; 
        const starBox = document.getElementById(`stars-${s.id}`);
        
        // 필터에 따른 인격 목록[cite: 2]
        let list = identities[i].filter(item => currentFilter === '3star' ? item.rank === 3 : true);
        
        let count = 0;
        const timer = setInterval(() => {
            const selected = list[Math.floor(Math.random() * list.length)];
            slot.innerHTML = `<img src="images/${s.folder}/${s.folder}_${selected.code}.png">`;
            label.innerText = selected.name;
            starBox.innerText = '★'.repeat(selected.rank);
            
            if (++count > 15) {
                clearInterval(timer);
                finished++;
                label.style.color = selected.rank === 3 ? "#ffc400" : "#fff";
                if (finished === sinners.length) this.disabled = false;
            }
        }, 100);
    });
};

// 필터링 버튼 이벤트
document.getElementById('filter-all').onclick = function() { 
    currentFilter = 'all'; this.classList.add('active'); 
    document.getElementById('filter-3star').classList.remove('active'); 
};
document.getElementById('filter-3star').onclick = function() { 
    currentFilter = '3star'; this.classList.add('active'); 
    document.getElementById('filter-all').classList.remove('active'); 
};
document.getElementById('go-back').onclick = () => location.reload();
