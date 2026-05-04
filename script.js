const sinners = [
    { id: "01", name: "이상", folder: "01_yi_sang" },
    { id: "02", name: "파우스트", folder: "02_faust" },
    { id: "03", name: "돈키호테", folder: "03_don" },
    { id: "04", name: "료슈", folder: "04_ryoshu" },
    { id: "05", name: "뫼르소", folder: "05_meursault" },
    { id: "06", name: "홍루", folder: "06_hong_lu" },
    { id: "07", name: "히스클리프", folder: "07_heath" },
    { id: "08", name: "이스마엘", folder: "08_ish" },
    { id: "09", name: "로쟈", folder: "09_rodion" },
    { id: "10", name: "싱클레어", folder: "10_sinclair" },
    { id: "11", name: "오티스", folder: "11_outis" },
    { id: "12", name: "그레고르", folder: "12_gregor" }
];

const sinnerData = {
    "이상": [
        { name: "LCB 수감자", rank: 1, img: "01_yi_sang_base.png" },
        { name: "검계 살수", rank: 3, img: "01_yi_sang_blade.png" },
        { name: "남부 리우 협회 3과", rank: 3, img: "01_yi_sang_liu.png" },
        { name: "로보토미 E.G.O::엄숙한 애도", rank: 3, img: "01_yi_sang_solemn.png" },
        { name: "약지 점묘파 스튜던트", rank: 3, img: "01_yi_sang_ring.png" },
        { name: "흑수 - 오필두", rank: 3, img: "01_yi_sang_kuro.png" },
        { name: "N사 E.G.O::흉탄", rank: 3, img: "01_yi_sang_ncorp.png" },
        { name: "피쿼드호 일등 항해사", rank: 2, img: "01_yi_sang_pequod.png" },
        { name: "W사 3등급 정리 요원", rank: 3, img: "01_yi_sang_w.png" },
        { name: "개화 E.G.O::동백", rank: 3, img: "01_yi_sang_spicebush.png" },
        { name: "남부 디에치 협회 4과", rank: 2, img: "01_yi_sang_dieci.png" },
        { name: "남부 세븐 협회 6과", rank: 2, img: "01_yi_sang_seven.png" },
        { name: "LCE E.G.O::초롱", rank: 2, img: "01_yi_sang_lantern.png" },
        { name: "어금니 사무소 해결사", rank: 2, img: "01_yi_sang_molar.png" },
        { name: "거미집 검지 아비", rank: 3, img: "01_yi_sang_index.png" }
    ],
    "파우스트": [
        { name: "LCB 수감자", rank: 1, img: "02_faust_base.png" },
        { name: "W사 2등급 정리 요원", rank: 2, img: "02_faust_w.png" },
        { name: "살아남은 로보토미 직원", rank: 2, img: "02_faust_lc.png" },
        { name: "남부 츠바이 협회 4과", rank: 2, img: "02_faust_zwei.png" },
        { name: "워더링하이츠 버틀러", rank: 2, img: "02_faust_butler.png" },
        { name: "쥐는 자", rank: 3, img: "02_faust_gripping.png" },
        { name: "남부 세븐 협회 4과", rank: 3, img: "02_faust_seven.png" },
        { name: "로보토미 E.G.O::후회", rank: 3, img: "02_faust_regret.png" },
        { name: "검계 살수", rank: 3, img: "02_faust_blade.png" },
        { name: "멀티크랙 사무소 대표", rank: 3, img: "02_faust_multicrack.png" },
        { name: "LCE E.G.O::홍염살", rank: 3, img: "02_faust_ardor.png" },
        { name: "흑수 - 묘 필두", rank: 3, img: "02_faust_kuro.png" },
        { name: "동부 시 협회 3과", rank: 3, img: "02_faust_shi.png" },
        { name: "검지 수행자:【쪽지】", rank: 3, img: "02_faust_index.png" }
        {name: "거미집 약지 제자 파우스트", rank: 3, img: "02_faust_ring.png"}
    ],
    "돈키호테": [
        { name: "LCB 수감자", rank: 1, img: "03_don_base.png" },
        { name: "남부 시 협회 5과 부장", rank: 2, img: "03_don_shi.png" },
        { name: "N사 중간 망치", rank: 2, img: "03_don_ncorp.png" },
        { name: "로보토미 E.G.O::초롱", rank: 2, img: "03_don_lantern.png" },
        { name: "검계 살수", rank: 2, img: "03_don_blade.png" },
        { name: "W사 3등급 정리 요원", rank: 3, img: "03_don_w.png" },
        { name: "남부 섕크 협회 5과 부장", rank: 3, img: "03_don_cinq_5.png" },
        { name: "중지 작은 아우", rank: 3, img: "03_don_middle.png" },
        { name: "T사 3등급 징수직 직원", rank: 3, img: "03_don_tcorp.png" },
        { name: "라만차랜드 실장", rank: 3, img: "03_don_lamancha.png" },
        { name: "동부 섕크 협회 3과", rank: 3, img: "03_don_cinq_3.png" },
        { name: "로보토미 E.G.O::사랑과 증오의 이름으로", rank: 3, img: "03_don_queenie.png" },
        { name: "흑수 - 미", rank: 3, img: "03_don_kuro.png" },
        { name: "검지 대행자 - 개화 E.G.O::대행", rank: 3, img: "03_don_index.png" }
    ],
    "료슈": [
        { name: "LCB 수감자", rank: 1, img: "04_ryoshu_base.png" },
        { name: "남부 세븐 협회 6과", rank: 2, img: "04_ryoshu_seven.png" },
        { name: "LCCB 대리", rank: 2, img: "04_ryoshu_lccb.png" },
        { name: "남부 리우 협회 4과", rank: 2, img: "04_ryoshu_liu.png" },
        { name: "20구 유로지비", rank: 2, img: "04_ryoshu_yurodivy.png" },
        { name: "흑운회 와카슈", rank: 3, img: "04_ryoshu_kurokumo.png" },
        { name: "료.고.파. 주방장", rank: 3, img: "04_ryoshu_rb.png" },
        { name: "W사 3등급 정리 요원", rank: 3, img: "04_ryoshu_w.png" },
        { name: "에드가 가문 치프 버틀러", rank: 3, img: "04_ryoshu_butler.png" },
        { name: "로보토미 E.G.O::적안 · 참회", rank: 3, img: "04_ryoshu_fourth_match.png" },
        { name: "흑수 - 묘", rank: 3, img: "04_ryoshu_kuro.png" },
        { name: "N사 E.G.O::경멸, 경외", rank: 3, img: "04_ryoshu_ncorp.png" },
        { name: "홍원 방랑무사", rank: 3, img: "04_ryoshu_hongyeon.png" },
        { name: "로보토미 E.G.O::잔향 · 외로움", rank: 3, img: "04_ryoshu_reverberation.png" }
    ],
    "뫼르소": [
        { name: "LCB 수감자", rank: 1, img: "05_meursault_base.png" },
        { name: "남부 리우 협회 6과", rank: 2, img: "05_meursault_liu.png" },
        { name: "장미스패너 공방 해결사", rank: 2, img: "05_meursault_rosespaner.png" },
        { name: "중지 작은 아우", rank: 2, img: "05_meursault_middle.png" },
        { name: "데드레빗츠 보스", rank: 2, img: "05_meursault_deadrabbits.png" },
        { name: "W사 2등급 정리 요원", rank: 3, img: "05_meursault_w.png" },
        { name: "N사 큰 망치", rank: 3, img: "05_meursault_ncorp.png" },
        { name: "R사 제 4무리 코뿔소팀", rank: 3, img: "05_meursault_rhino.png" },
        { name: "검계 우두머리", rank: 3, img: "05_meursault_blade.png" },
        { name: "남부 디에치 협회 4과 부장", rank: 3, img: "05_meursault_dieci.png" },
        { name: "서부 섕크 협회 3과", rank: 3, img: "05_meursault_cinq.png" },
        { name: "동부 엄지 카포 IIII", rank: 3, img: "05_meursault_thumb.png" },
        { name: "라만차랜드 왕자", rank: 3, img: "05_meursault_lamancha.png" },
        { name: "로보토미 E.G.O::호넷【변조】", rank: 3, img: "05_meursault_hornet.png" }
        { name: "약지 야수파 스튜던트 뫼르소", rank: 3, img: "05_meursault_ring.png" }
    ],
    "홍루": [
        { name: "LCB 수감자", rank: 1, img: "06_hong_lu_base.png" },
        { name: "흑운회 와카슈", rank: 2, img: "06_hong_lu_kurokumo.png" },
        { name: "남부 리우 협회 5과", rank: 2, img: "06_hong_lu_liu.png" },
        { name: "W사 2등급 정리 요원", rank: 2, img: "06_hong_lu_w.png" },
        { name: "갈고리 사무소 해결사", rank: 2, img: "06_hong_lu_hook.png" },
        { name: "송곳니 사냥 사무소 해결사", rank: 2, img: "06_hong_lu_fang.png" },
        { name: "콩콩이파 두목", rank: 3, img: "06_hong_lu_tincan.png" },
        { name: "K사 3등급 적출직 직원", rank: 3, img: "06_hong_lu_kcorp.png" },
        { name: "남부 디에치 협회 4과", rank: 3, img: "06_hong_lu_dieci.png" },
        { name: "20구 유로지비", rank: 3, img: "06_hong_lu_yurodivy.png" },
        { name: "마침표 사무소 대표", rank: 3, img: "06_hong_lu_fullstop.png" },
        { name: "R사 제 4무리 순록팀", rank: 3, img: "06_hong_lu_reindeer.png" },
        { name: "홍원 군주", rank: 3, img: "06_hong_lu_hongyeon.png" }
        { name: "거미집 약지 아비 홍루", rank: 3, img: "06_honglu_ring.png" }
    ],
    "히스클리프": [
        { name: "LCB 수감자", rank: 1, img: "07_heath_base.png" },
        { name: "남부 시 협회 5과", rank: 2, img: "07_heath_shi.png" },
        { name: "N사 작은 망치", rank: 2, img: "07_heath_ncorp_small.png" },
        { name: "남부 세븐 협회 4과", rank: 2, img: "07_heath_seven.png" },
        { name: "멀티크랙 사무소 해결사", rank: 2, img: "07_heath_multicrack.png" },
        { name: "R사 제 4무리 토끼팀", rank: 3, img: "07_heath_rabbit.png" },
        { name: "로보토미 E.G.O::여우비", rank: 3, img: "07_heath_sunshower.png" },
        { name: "피쿼드호 작살잡이", rank: 3, img: "07_heath_pequod.png" },
        { name: "남부 외우피 협회 3과", rank: 3, img: "07_heath_oafi.png" },
        { name: "와일드헌트", rank: 3, img: "07_heath_wildhunt.png" },
        { name: "마침표 사무소 해결사", rank: 3, img: "07_heath_fullstop.png" },
        { name: "흑운회 와카슈", rank: 3, img: "07_heath_kurokumo.png" },
        { name: "W사 4등급 정리 요원 - CCA", rank: 3, img: "07_heath_w.png" },
        { name: "흑수 - 유 필두", rank: 3, img: "07_heath_kuro.png" }
        { name: "중지 작은형님 히스클리프", rank: 3, img: "05_heath_middle.png" }
    ],
    "이스마엘": [
        { name: "LCB 수감자", rank: 1, img: "08_ish_base.png" },
        { name: "남부 시 협회 5과", rank: 2, img: "08_ish_shi.png" },
        { name: "LCCB 대리", rank: 2, img: "08_ish_lccb.png" },
        { name: "로보토미 E.G.O::출렁임", rank: 2, img: "08_ish_sloshing.png" },
        { name: "에드가 가문 버틀러", rank: 2, img: "08_ish_butler.png" },
        { name: "R사 제 4무리 순록팀", rank: 3, img: "08_ish_reindeer.png" },
        { name: "남부 리우 협회 4과", rank: 3, img: "08_ish_liu.png" },
        { name: "어금니 보트 센터 해결사", rank: 3, img: "08_ish_molar.png" },
        { name: "피쿼드호 선장", rank: 3, img: "08_ish_captain.png" },
        { name: "서부 츠바이 협회 3과", rank: 3, img: "08_ish_zwei.png" },
        { name: "흑운회 부조장", rank: 3, img: "08_ish_kurokumo.png" },
        { name: "가주 후보", rank: 3, img: "08_ish_heir.png" },
        { name: "정사무소 대표", rank: 3, img: "08_ish_office.png" },
        { name: "거미집 중지 제자", rank: 3, img: "08_ish_middle.png" }
    ],
    "로쟈": [
        { name: "LCB 수감자", rank: 1, img: "09_rodion_base.png" },
        { name: "LCCB 대리", rank: 2, img: "09_rodion_lccb.png" },
        { name: "N사 중간 망치", rank: 2, img: "09_rodion_ncorp.png" },
        { name: "남부 츠바이 협회 5과", rank: 2, img: "09_rodion_zwei.png" },
        { name: "T사 2등급 징수직 직원", rank: 2, img: "09_rodion_tcorp.png" },
        { name: "흑운회 와카슈", rank: 3, img: "09_rodion_kurokumo.png" },
        { name: "장미스패너 공방 대표", rank: 3, img: "09_rodion_rosespaner.png" },
        { name: "남부 디에치 협회 4과", rank: 3, img: "09_rodion_dieci.png" },
        { name: "남부 리우 협회 4과 부장", rank: 3, img: "09_rodion_liu.png" },
        { name: "북부 제뱌찌 협회 3과", rank: 3, img: "09_rodion_devyat.png" },
        { name: "라만차랜드 공주", rank: 3, img: "09_rodion_lamancha.png" },
        { name: "흑수 - 사", rank: 3, img: "09_rodion_kuro.png" },
        { name: "로보토미 E.G.O::눈물로 벼려낸 검", rank: 3, img: "09_rodion_efflorescence.png" },
        { name: "R사 제 4무리 순록팀", rank: 3, img: "09_rodion_reindeer.png" }
        { name: "약지 야수파 도슨트 로쟈", rank: 3, img: "09_rodion_ring.png" }
    ],
    "싱클레어": [
        { name: "LCB 수감자", rank: 1, img: "10_sinclair_base.png" },
        { name: "남부 츠바이 협회 6과", rank: 2, img: "10_sinclair_zwei_6.png" },
        { name: "마리아치 보스", rank: 2, img: "10_sinclair_mariachi.png" },
        { name: "로보토미 E.G.O::홍적", rank: 2, img: "10_sinclair_talisman.png" },
        { name: "어금니 보트 센터 해결사", rank: 2, img: "10_sinclair_molar.png" },
        { name: "서부 츠바이 협회 3과", rank: 2, img: "10_sinclair_zwei_3.png" },
        { name: "검계 살수", rank: 3, img: "10_sinclair_blade.png" },
        { name: "쥐어들 자", rank: 3, img: "10_sinclair_ncorp.png" },
        { name: "남부 섕크 협회 4과 부장", rank: 3, img: "10_sinclair_cinq.png" },
        { name: "새벽 사무소 해결사", rank: 3, img: "10_sinclair_philip.png" },
        { name: "북부 제뱌찌 협회 3과", rank: 3, img: "10_sinclair_devyat.png" },
        { name: "중지 작은 아우", rank: 3, img: "10_sinclair_middle.png" },
        { name: "동부 엄지 솔다토 II", rank: 3, img: "10_sinclair_thumb.png" },
        { name: "흑수 - 유", rank: 3, img: "10_sinclair_kuro.png" },
        { name: "거미집 소지 제자", rank: 3, img: "10_sinclair_finger.png" }
    ],
    "오티스": [
        { name: "LCB 수감자", rank: 1, img: "11_outis_base.png" },
        { name: "검계 살수", rank: 2, img: "11_outis_blade.png" },
        { name: "G사 부장", rank: 2, img: "11_outis_gcorp.png" },
        { name: "남부 섕크 협회 4과", rank: 2, img: "11_outis_cinq.png" },
        { name: "약지 점묘파 스튜던트", rank: 2, img: "11_outis_ring.png" },
        { name: "남부 세븐 협회 6과 부장", rank: 3, img: "11_outis_seven.png" },
        { name: "어금니 사무소 해결사", rank: 3, img: "11_outis_molar.png" },
        { name: "로보토미 E.G.O::마탄", rank: 3, img: "11_outis_magicbullet.png" },
        { name: "워더링하이츠 치프 버틀러", rank: 3, img: "11_outis_butler.png" },
        { name: "W사 3등급 정리 요원 팀장", rank: 3, img: "11_outis_w.png" },
        { name: "라만차랜드 이발사", rank: 3, img: "11_outis_barber.png" },
        { name: "흑수 - 묘", rank: 3, img: "11_outis_kuro.png" },
        { name: "T사 3등급 강력징수직 직원", rank: 3, img: "11_outis_tcorp.png" },
        { name: "LCA 우제트 선봉 3팀 팀장", rank: 3, img: "11_outis_udjat.png" }
    ],
    "그레고르": [
        { name: "LCB 수감자", rank: 1, img: "12_gregor_base.png" },
        { name: "남부 리우 협회 6과", rank: 2, img: "12_gregor_liu.png" },
        { name: "료.고.파. 조수", rank: 2, img: "12_gregor_rb.png" },
        { name: "장미스패너 공방 해결사", rank: 2, img: "12_gregor_rosespaner.png" },
        { name: "흑운회 부조장", rank: 2, img: "12_gregor_kurokumo.png" },
        { name: "G사 일등대리", rank: 3, img: "12_gregor_gcorp.png" },
        { name: "남부 츠바이 협회 4과", rank: 3, img: "12_gregor_zwei.png" },
        { name: "쌍갈고리 해적단 부선장", rank: 3, img: "12_gregor_hook.png" },
        { name: "에드가 가문 승계자", rank: 3, img: "12_gregor_heir.png" },
        { name: "라만차랜드 신부", rank: 3, img: "12_gregor_lamancha.png" },
        { name: "불주먹 사무소 생존자", rank: 3, img: "12_gregor_firefist.png" },
        { name: "흑수 - 사", rank: 3, img: "12_gregor_kuro.png" },
        { name: "밤의 송곳 카피타노", rank: 3, img: "12_gregor_stiletto.png" },
        { name: "로보토미 E.G.O::램프", rank: 3, img: "12_gregor_lamp.png" },
        { name: "LCE E.G.O::AEDD", rank: 3, img: "12_gregor_aedd.png" }
    ]
};

const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
let currentFilter = 'all'; // 기본값: 전체 인격

// 2. 오디오 컨트롤 설정
volumeSlider.oninput = (e) => {
    bgm.volume = e.target.value;
};

muteBtn.onclick = () => {
    if (bgm.muted) {
        bgm.muted = false;
        muteBtn.innerText = "🔊 ON";
    } else {
        bgm.muted = true;
        muteBtn.innerText = "🔇 MUTE";
    }
};

// 3. 메인 화면 -> 게임 화면 전환
document.getElementById('start-btn').onclick = () => {
    bgm.play().catch(err => console.log("자동 재생 방지 대기 중"));
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    renderGrid(); 
};

// 4. 필터 버튼 이벤트 (텍스트 수정 반영)
document.getElementById('filter-all').onclick = function() { 
    currentFilter = 'all'; 
    this.classList.add('active'); 
    document.getElementById('filter-3star').classList.remove('active'); 
};

document.getElementById('filter-3star').onclick = function() { 
    currentFilter = '3star'; 
    this.classList.add('active'); 
    document.getElementById('filter-all').classList.remove('active'); 
};

// 5. 수감자 그리드 생성
function renderGrid() {
    const grid = document.getElementById('sinner-grid');
    grid.innerHTML = '';
    sinners.forEach(s => {
        const card = document.createElement('div');
        card.className = 'sinner-card';
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

// 6. 룰렛 실행 로직 (1성 포함 수정 완료)
document.getElementById('spin-all-btn').onclick = function() {
    this.disabled = true;
    let finished = 0;

    sinners.forEach(s => {
        const slot = document.getElementById(`slot-${s.id}`);
        const label = slot.nextElementSibling; 
        const starBox = document.getElementById(`stars-${s.id}`);
        
        // 필터 로직: '3star'면 3성만, 'all'이면 전체(true)
        let list = sinnerData[s.name].filter(item => 
            currentFilter === '3star' ? item.rank === 3 : true 
        );

        let count = 0;
        const timer = setInterval(() => {
            const randomIdx = Math.floor(Math.random() * list.length);
            const selected = list[randomIdx];

            slot.innerHTML = `<img src="images/${s.folder}/${selected.img}">`;
            label.innerText = `${s.name} - ${selected.name}`;
            starBox.innerText = '★'.repeat(selected.rank);
            
            if (++count > 15) {
                clearInterval(timer);
                finished++;
                
                // 3성 강조 효과
                if (selected.rank === 3) {
                    label.style.textShadow = "0 0 8px #ffc400";
                    label.style.color = "#ffc400";
                } else {
                    label.style.textShadow = "none";
                    label.style.color = "#fff";
                }

                if (finished === sinners.length) this.disabled = false;
            }
        }, 100);
    });
};

document.getElementById('go-back').onclick = () => location.reload();
