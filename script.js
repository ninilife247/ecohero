window.HeroApp = (() => {
    const state = {
        exp: 0,
        level: 1,
        missionsCompleted: 0,
        nickname: '초록이 히어로',
        avatar: '🦸‍♂️',
        completedMissions: [],
        currentTab: 'home',
        activeScanTab: 'how',
        activeEcoCategory: 'all',
        activeQuizCategory: 'recycle',
        activeOxCategory: 'recycle',
        nearbySchools: []
    };

    const FACE_CHARACTERS = [
        { id: "hero_minwoo", name: "민우 히어로", face: "👦", bg: "from-sky-300 to-blue-400" },
        { id: "hero_soyul", name: "소율 히어로", face: "👧", bg: "from-emerald-300 to-teal-400" },
        { id: "fairy_tinker", name: "티티 요정", face: "🧚‍♀️", bg: "from-emerald-200 via-teal-200 to-sky-200" },
        { id: "fairy_starlight", name: "별빛 요정", face: "🧚‍♂️", bg: "from-teal-300 via-emerald-300 to-cyan-300" },
        { id: "hero_ocean", name: "인어 히어로", face: "🧜‍♀️", bg: "from-cyan-300 to-teal-400" },
        { id: "fairy_wind", name: "바람 요정", face: "👼", bg: "from-sky-200 to-indigo-300" },
        { id: "prince_sun", name: "햇살 왕자", face: "🤴", bg: "from-amber-300 to-yellow-400" },
        { id: "princess_rainbow", name: "무지개 공주", face: "👸", bg: "from-emerald-300 via-teal-300 to-sky-300" },
        { id: "explorer", name: "숲속 탐험가", face: "🤠", bg: "from-lime-300 to-emerald-500" },
        { id: "wizard", name: "마법사 요정", face: "🧙‍♀️", bg: "from-teal-300 to-emerald-400" },
        { id: "rabbit", name: "토끼 요정", face: "🐰", bg: "from-emerald-200 to-teal-300" },
        { id: "bear", name: "곰돌이 히어로", face: "🐻", bg: "from-amber-200 to-amber-400" },
        { id: "cat", name: "야옹이 파수꾼", face: "🐱", bg: "from-yellow-200 to-amber-300" },
        { id: "dog", name: "멍뭉이 히어로", face: "🐶", bg: "from-amber-100 to-orange-200" },
        { id: "fox", name: "여우 요정", face: "🦊", bg: "from-orange-300 to-amber-400" },
        { id: "chick", name: "병아리 요정", face: "🐣", bg: "from-yellow-200 to-amber-300" }
    ];

    const ECO_GUIDE_ENCYCLOPEDIA = [
        { category: "carbon", tag: "탄소중립 / 에너지", icon: "🔌", title: "대기전력 플러그 뽑기", desc: "TV나 컴퓨터를 쓰지 않을 때 플러그를 뽑으면 이산화탄소를 줄이고 지구가 상쾌해져요!" },
        { category: "carbon", tag: "탄소중립 / 수송", icon: "🚲", title: "가까운 거리 걸어가기", desc: "자동차 대신 자전거나 걷기를 실천하면 매일 소나무 2그루를 심는 기적의 효과가 있어요." },
        { category: "carbon", tag: "탄소중립 / 식생활", icon: "🍱", title: "음식 잔반 남기지 않기", desc: "음식물이 부패할 때 온실가스가 나와요! 딱 먹을 만큼만 받아 맛있게 싹싹 먹어요." },
        { category: "carbon", tag: "탄소중립 / 자원순환", icon: "🥛", title: "텀블러 & 에코백 쓰기", desc: "일회용 컵 대신 개인 텀블러, 비닐 봉지 대신 에코백을 쓰면 온실가스를 대폭 줄여요!" },
        { category: "carbon", tag: "탄소중립 / 절전", icon: "💡", title: "안 쓰는 방 불 끄기", desc: "방을 나올 때 전등 스위치를 내리는 작은 습관이 전기를 만들 때 나오는 탄소를 막아줘요." },
        { category: "carbon", tag: "탄소중립 / 절수", icon: "🚿", title: "양치 컵 쓰기 & 물 아끼기", desc: "양치할 때 물을 틀어놓지 않고 컵을 사용하면 깨끗한 물을 만드는 에너지가 절약돼요." },
        { category: "special", tag: "일반쓰레기 / 수거함", icon: "🧊", title: "아이스팩 (젤 형태)", desc: "통째로 종량제 봉투에 버리거나 주민센터 전용 수거함에 배출해요. (하수구 배출 금지!)" },
        { category: "plastic", tag: "플라스틱류", icon: "🍱", title: "배달 용기", desc: "음식물을 깨끗이 세척 후 플라스틱으로 배출해요. 빨간 양념이 안 지워지면 일반쓰레기입니다." },
        { category: "special", tag: "전용 수거함", icon: "🔋", title: "폐건전지 (AA/AAA)", desc: "일반 쓰레기로 버리면 환경오염이 심해요. 아파트나 주민센터 전용 수거함에 모아 배출하세요." },
        { category: "plastic", tag: "투명 페트병", icon: "🍾", title: "투명 생수 페트병", desc: "내용물을 헹구고 비닐 라벨을 뗀 후 꾹 찌그러뜨려서 '투명 페트병 전용'함에 버려요." },
        { category: "paper", tag: "종이류", icon: "📦", title: "택배 상자 / 박스", desc: "상자에 붙어있는 비닐 테이프와 운송장 스티커를 깔끔히 제거한 후 납작하게 접어 배출해요." },
        { category: "paper", tag: "일반쓰레기", icon: "🍕", title: "기름 묻은 피자 상자", desc: "기름과 음식물이 배어든 종이는 재활용 기계를 고장내므로 반드시 일반쓰레기로 버려요." },
        { category: "can", tag: "캔/고철류", icon: "🥫", title: "음료수 캔 / 참치캔", desc: "내용물을 비우고 물로 헹군 뒤 배출해요. 참치캔은 가급적 눌러서 찌그러뜨려주세요." },
        { category: "can", tag: "위험물 / 캔", icon: "💥", title: "부탄가스 / 스프레이", desc: "통풍이 잘되는 야외에서 꼭 구멍을 뚫어 가스를 완전히 뺀 뒤 캔류로 배출해 주세요." },
        { category: "can", tag: "유리병류", icon: "🍾", title: "유리병 (주스/잼)", desc: "안에 담배꽁초 등 이물질을 절대 넣지 말고 세척 후 배출해요. 깨진 유리는 신문지에 싸서 일반쓰레기!" },
        { category: "vinyl", tag: "비닐류", icon: "🛍️", title: "과자 봉지 / 비닐", desc: "음식물이 묻지 않은 깨끗한 비닐은 바람에 날아가지 않게 한곳에 모아서 비닐류에 버려요." },
        { category: "vinyl", tag: "스티로폼", icon: "🥡", title: "흰색 스티로폼 상자", desc: "테이프와 택배 스티커를 모두 뗀 후 깨끗한 상태의 흰색 스티로폼만 따로 모아 버려요." },
        { category: "paper", tag: "일반쓰레기", icon: "🧾", title: "영수증 / 전단지", desc: "약품 처리된 감열지 영수증과 코팅된 비닐 전단지는 재활용이 불가능한 일반쓰레기입니다." }
    ];

    const WASTE_GUIDE_DB = {
        "plastic": {
            cat: "플라스틱류", title: "플라스틱 용기/병",
            steps: ["안에 남은 내용물은 싹싹 비우고 물로 깨끗하게 씻어주세요!", "통에 붙어있는 스티커나 라벨은 떼어내서 따로 버려요.", "부피가 작아지도록 발로 꾹~ 밟아서 버려주면 최고예요!"],
            caution: "기름때나 빨간 국물이 아무리 씻어도 안 지워지면, 아쉽지만 일반쓰레기로 버려야 해요.",
            story: "플라스틱을 재활용하면 새 플라스틱을 만들 때보다 온실가스를 80%나 줄일 수 있어서 지구가 아주 기뻐해요!",
            usage: "버리기 전에 다 쓴 플라스틱 통을 예쁘게 꾸며서 나만의 미니 화분이나 작은 장난감 보관함으로 만들어 보세요."
        },
        "paper": {
            cat: "종이류", title: "종이 및 박스",
            steps: ["상자에 붙어있는 테이프나 택배 스티커는 모두 떼어주세요.", "물에 젖지 않게 조심하고, 반듯하게 접거나 펼쳐서 모아주세요."],
            caution: "피자 상자처럼 기름이 많이 묻었거나, 음식물이 묻은 종이는 일반쓰레기로 버려주세요.",
            story: "종이를 잘 모으면 수많은 나무를 보호할 수 있어요. 나무는 이산화탄소를 마시고 산소를 주는 지구의 허파랍니다!",
            usage: "다 쓴 휴지심으로 멋진 망원경 장난감을 만들거나, 예쁜 빈 상자는 나만의 보물상자로 꾸며보세요."
        },
        "can": {
            cat: "캔/고철류", title: "금속 캔/고철",
            steps: ["캔 안에 남은 주스나 참치는 깨끗한 물로 헹궈내요.", "플라스틱 뚜껑이 있다면 꼭 따로 분리해서 버려주세요."],
            caution: "부탄가스나 스프레이 통은 어른들께 부탁해 구멍을 뚫어 가스를 뺀 후 버려요.",
            story: "캔 하나를 재활용하면 TV를 3시간 동안 틀 수 있는 전기를 아끼고 그만큼의 탄소를 줄일 수 있답니다!",
            usage: "다 먹은 참치캔을 깨끗이 씻어서 예쁜 색종이로 감싸주면 귀여운 연필꽂이나 작은 소품함이 돼요."
        },
        "trash": {
            cat: "일반쓰레기", title: "일반 쓰레기",
            steps: ["종량제 봉투에 담아서 배출해주세요.", "위험한 물건은 감싸서 버려요."],
            caution: "재활용품이 섞이지 않도록 버리기 전 한 번 더 확인하세요!",
            story: "쓰레기 양을 줄일수록 소각장에서 발생하는 온실가스가 줄어 지구가 시원해집니다.",
            usage: "버리기 전 '이걸로 다른 것을 만들 수 있을까?' 한 번 더 생각해보는 기후 히어로가 되어보아요!"
        }
    };

    const LEVELS = [
        { exp: 0, title: "새싹 히어로", max: 100 },
        { exp: 100, title: "동네 지킴이", max: 300 },
        { exp: 300, title: "에코 레인저", max: 600 },
        { exp: 600, title: "환경 수호자", max: 1000 },
        { exp: 1000, title: "에코 마스터", max: 9999 }
    ];

    const RECYCLE_QUIZ_DB = [
        { icon: "🍗", name: "치킨 뼈다귀", q: "맛있게 먹은 치킨 뼈다귀는?", desc: "딱딱해서 동물이 먹다 다칠 수 있어요.", ans: 0, opts: ["일반쓰레기", "음식물 쓰레기", "종이류", "비닐류"], exp: "닭 뼈, 돼지 뼈, 생선 가시 등은 딱딱해서 동물의 사료로 쓸 수 없으니 일반쓰레기로 버려야 해요." },
        { icon: "🧅", name: "양파 껍질", q: "양파 껍질은 무슨 쓰레기?", desc: "동물이 먹을 수 있는지 생각해요!", ans: 0, opts: ["일반쓰레기", "음식물 쓰레기", "플라스틱", "종이류"], exp: "단단하고 동물에게 해로운 성분이 있어서 일반쓰레기예요." },
        { icon: "🍕", name: "피자 상자", q: "기름진 피자 상자는?", desc: "오염된 종이는 재활용이 안 돼요!", ans: 1, opts: ["종이류", "일반쓰레기", "음식물 쓰레기", "비닐류"], exp: "기름이 심하게 묻은 종이는 재활용 기계에서 깨끗한 종이를 망가뜨려요. 일반쓰레기로 버려주세요." },
        { icon: "🔋", name: "건전지", q: "다 쓴 건전지는?", desc: "유해 물질이 들어있어요!", ans: 2, opts: ["캔/고철", "일반쓰레기", "전용수거함", "유리병"], exp: "건전지를 그냥 버리면 흙과 물이 크게 오염돼요. 주민센터나 아파트의 전용 수거함에 꼭 넣어주세요." },
        { icon: "🍉", name: "수박 껍질", q: "수박 껍질은?", desc: "잘게 자르면 동물이 먹을 수 있어요.", ans: 1, opts: ["일반쓰레기", "음식물 쓰레기", "나무류", "종이류"], exp: "수박 껍질은 물기가 많아 썩기 쉬워요. 잘게 잘라서 음식물 쓰레기로 버리면 좋은 퇴비가 된답니다." }
    ];

    const CARBON_QUIZ_DB = [
        { icon: "🔌", name: "대기전력 차단", q: "사용하지 않는 TV나 드라이기 플러그는?", desc: "꼽아만 두어도 전기가 샐 수 있어요!", ans: 0, opts: ["플러그 뽑기", "계속 꼽아두기", "하루종일 켜두기", "물 묻은 손으로 만지기"], exp: "쓰지 않는 전자기기의 플러그를 뽑아두면 대기전력을 차단해 온실가스를 크게 줄일 수 있어요!" },
        { icon: "🥛", name: "일회용 컵 대신", q: "카페나 학교에서 음료를 마실 때 가장 좋은 방법은?", desc: "한 번 쓰고 버리는 건 탄소를 많이 만들어내요.", ans: 1, opts: ["일회용 빨대 쓰기", "개인 텀블러 쓰기", "비닐 컵 쓰기", "종이컵 여러개 쓰기"], exp: "텀블러를 사용하면 일회용 컵을 만들 때 나오는 온실가스를 막고 소나무를 심는 효과를 낸답니다." },
        { icon: "🚲", name: "친환경 이동", q: "가까운 동네 마트에 갈 때 가장 좋은 기후행동은?", desc: "매연이 안 나오는 이동 방법을 골라보아요!", ans: 2, opts: ["승용차 타기", "택시 타고 가기", "걷거나 자전거 타기", "오토바이 타기"], exp: "가까운 거리를 걷거나 자전거로 이동하면 매연과 탄소 배출이 0이 되어 지구가 상쾌해져요!" }
    ];

    const RECYCLE_OX_DB = [
        { q: "코팅된 배달 전단지는 종이로 분리수거해야 한다.", ans: "X", exp: "비닐로 코팅된 종이는 재활용이 안 되는 일반쓰레기입니다." },
        { q: "투명 페트병은 비닐 라벨을 떼어내고 배출해야 한다.", ans: "O", exp: "라벨을 뗀 투명 페트병은 최고급 옷감 재료로 재활용됩니다!" },
        { q: "귤 껍질과 사과 껍질은 음식물 쓰레기로 버린다.", ans: "O", exp: "부드러운 과일 껍질은 동물의 사료나 비료가 되는 음식물 쓰레기입니다." }
    ];

    const CARBON_OX_DB = [
        { q: "쓰지 않는 전자기기 플러그를 뽑으면 탄소가 줄어든다.", ans: "O", exp: "대기전력을 아끼면 발전소에서 나는 온실가스를 크게 줄일 수 있어요!" },
        { q: "여름철 에어컨 희망온도를 18도로 차갑게 유지하는 것이 친환경적이다.", ans: "X", exp: "실내 적정온도 26도를 유지해야 전기를 아끼고 지구 열을 내릴 수 있어요." }
    ];

    let quizState = { list: [], current: 0, score: 0 };
    const OPT_COLORS = ["bg-emerald-500 hover:bg-emerald-600", "bg-amber-500 hover:bg-amber-600", "bg-sky-500 hover:bg-sky-600", "bg-indigo-500 hover:bg-indigo-600"];
    let comicState = { current4CutData: null, isPlayingFullVoice: false };
    let oxState = { list: [], current: 0, score: 0 };

    let bgmAudioCtx = null;
    let bgmInterval = null;

    function playSoftBgm() {
        if (bgmInterval) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!bgmAudioCtx) bgmAudioCtx = new AudioContext();
            if (bgmAudioCtx.state === 'suspended') bgmAudioCtx.resume();

            const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
            bgmInterval = setInterval(() => {
                if (!bgmAudioCtx) return;
                const osc = bgmAudioCtx.createOscillator();
                const gain = bgmAudioCtx.createGain();

                osc.type = 'sine';
                const freq = notes[Math.floor(Math.random() * notes.length)];
                osc.frequency.setValueAtTime(freq, bgmAudioCtx.currentTime);

                gain.gain.setValueAtTime(0.015, bgmAudioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, bgmAudioCtx.currentTime + 1.2);

                osc.connect(gain);
                gain.connect(bgmAudioCtx.destination);

                osc.start();
                osc.stop(bgmAudioCtx.currentTime + 1.2);
            }, 500);
        } catch(e){}
    }

    function stopSoftBgm() {
        if (bgmInterval) {
            clearInterval(bgmInterval);
            bgmInterval = null;
        }
    }

    async function initGeolocationAndSchools() {
        const locTextEl = document.getElementById('user-location-text');
        useJejuFallbackSchools();

        if (!navigator.geolocation) {
            if (locTextEl) locTextEl.innerText = "제주시 아라동";
            renderSchoolRanking();
            return;
        }

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            try {
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ko`);
                const geoData = await geoRes.json();
                const addr = geoData.address;
                const district = addr.suburb || addr.borough || addr.village || addr.city || '제주';
                if (locTextEl) locTextEl.innerText = `${district}`;
            } catch (e) {
                if (locTextEl) locTextEl.innerText = "제주시 아라동";
            }

            renderSchoolRanking();
        }, () => {
            useJejuFallbackSchools();
            renderSchoolRanking();
        }, { timeout: 8000 });
    }

    function useJejuFallbackSchools() {
        state.nearbySchools = [
            { rank: 1, name: '🏫 제주아라초등학교', score: '15,800 EXP', students: '340명 참여' },
            { rank: 2, name: '🏫 신제주초등학교', score: '13,400 EXP', students: '290명 참여' },
            { rank: 3, name: '🏫 제주중앙초등학교', score: '10,200 EXP', students: '210명 참여' }
        ];
    }

    function switchTab(tabId) {
        state.currentTab = tabId;
        const views = document.querySelectorAll('.tab-view');
        views.forEach(v => v.classList.remove('active'));

        const targetView = document.getElementById(`view-${tabId}`);
        if (targetView) targetView.classList.add('active');

        const navBtns = document.querySelectorAll('.nav-tab-btn');
        navBtns.forEach(b => {
            b.classList.remove('text-emerald-600', 'bg-emerald-50', 'font-extrabold');
        });

        let activeBtnId = (tabId === 'ox' || tabId === 'catch' || tabId === 'survival') ? 'quiz' : tabId;
        const activeBtn = document.getElementById(`nav-btn-${activeBtnId}`);
        if (activeBtn) {
            activeBtn.classList.add('text-emerald-600', 'bg-emerald-50', 'font-extrabold');
        }

        const isGameTab = ['quiz', 'ox', 'catch', 'survival'].includes(tabId);
        document.getElementById('mobile-game-menu').classList.toggle('hidden', !isGameTab);
        document.querySelectorAll('.mobile-game-btn').forEach(btn => {
            const isActive = (btn.id === `mobile-game-${tabId}`);
            btn.classList.toggle('bg-emerald-500', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('bg-white', !isActive);
            btn.classList.toggle('text-slate-700', !isActive);
        });

        if (tabId === 'ecoguide') filterEcoGuide('all');
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function focusIframe(iframeId) {
        const iframe = document.getElementById(iframeId);
        if (iframe) {
            setTimeout(() => {
                iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
                try { iframe.contentWindow.focus(); } catch (e) { iframe.focus(); }
            }, 100);
        }
    }

    function toggleFullscreen(iframeId) {
        const iframe = document.getElementById(iframeId);
        if (!iframe) return;
        if (iframe.requestFullscreen) iframe.requestFullscreen();
        else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    }

    function selectGame(gameKey) {
        if (gameKey === 'quiz') { switchTab('quiz'); startQuiz(); }
        else if (gameKey === 'ox') { switchTab('ox'); startOxQuiz(); }
        else if (gameKey === 'catch') { switchTab('catch'); }
        else if (gameKey === 'survival') { switchTab('survival'); }
    }

    function filterEcoGuide(category) {
        state.activeEcoCategory = category;

        document.querySelectorAll('[id^="ecoguide-subtab-"]').forEach(btn => {
            if (btn.id === 'ecoguide-subtab-web') return;
            const isActive = (btn.id === `ecoguide-subtab-${category}`);
            btn.classList.toggle('bg-emerald-500', isActive);
            btn.classList.toggle('text-white', isActive);
            btn.classList.toggle('border-emerald-500', isActive);
            btn.classList.toggle('bg-white', !isActive);
            btn.classList.toggle('text-slate-700', !isActive);
        });

        const cardsBox = document.getElementById('ecoguide-cards-container');
        const iframeBox = document.getElementById('ecoguide-iframe-container');
        const searchBox = document.getElementById('ecoguide-search-box');

        if (category === 'web') {
            if (cardsBox) cardsBox.classList.add('hidden');
            if (searchBox) searchBox.classList.add('hidden');
            if (iframeBox) iframeBox.classList.remove('hidden');
            return;
        }

        if (iframeBox) iframeBox.classList.add('hidden');
        if (cardsBox) cardsBox.classList.remove('hidden');
        if (searchBox) searchBox.classList.remove('hidden');

        let filtered = [];
        if (category === 'all') {
            filtered = ECO_GUIDE_ENCYCLOPEDIA;
        } else if (category === 'recycle_all') {
            filtered = ECO_GUIDE_ENCYCLOPEDIA.filter(item => item.category !== 'carbon');
        } else {
            filtered = ECO_GUIDE_ENCYCLOPEDIA.filter(item => item.category === category);
        }

        renderEcoGuideCards(filtered);
    }

    function searchEcoGuide(query) {
        if(!query || query.trim() === '') { filterEcoGuide(state.activeEcoCategory); return; }

        const searchFiltered = ECO_GUIDE_ENCYCLOPEDIA.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase()) ||
            item.tag.toLowerCase().includes(query.toLowerCase())
        );
        renderEcoGuideCards(searchFiltered);
    }

    function renderEcoGuideCards(items) {
        const container = document.getElementById('ecoguide-cards-container');
        if(!container) return;
        if (items.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400 font-bold"><p>검색 결과가 없어요!</p></div>`;
            return;
        }
        container.innerHTML = items.map(item => `
            <div class="glass-card p-5 rounded-2xl space-y-3 hover:-translate-y-1 transition-all border-emerald-100">
                <div class="flex justify-between items-center">
                    <span class="text-4xl">${item.icon}</span>
                    <span class="${item.category === 'carbon' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'} border text-xs font-bold px-3 py-1 rounded-full hero-font">${item.tag}</span>
                </div>
                <h4 class="hero-font text-xl text-slate-800">${item.title}</h4>
                <p class="text-sm text-slate-600 font-bold leading-relaxed">${item.desc}</p>
            </div>
        `).join('');
    }

    function setQuizCategory(categoryKey) {
        state.activeQuizCategory = categoryKey;
        const recycleBtn = document.getElementById('quiz-subtab-recycle');
        const carbonBtn = document.getElementById('quiz-subtab-carbon');

        if (categoryKey === 'recycle') {
            recycleBtn.className = "flex-1 py-3 px-5 rounded-xl font-bold hero-font text-base transition-all bg-emerald-500 text-white shadow-md flex items-center justify-center gap-2";
            carbonBtn.className = "flex-1 py-3 px-5 rounded-xl font-bold hero-font text-base transition-all text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-2";
        } else {
            carbonBtn.className = "flex-1 py-3 px-5 rounded-xl font-bold hero-font text-base transition-all bg-amber-500 text-white shadow-md flex items-center justify-center gap-2";
            recycleBtn.className = "flex-1 py-3 px-5 rounded-xl font-bold hero-font text-base transition-all text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-2";
        }
        startQuiz();
    }

    function startQuiz() {
        const targetDb = (state.activeQuizCategory === 'carbon') ? CARBON_QUIZ_DB : RECYCLE_QUIZ_DB;
        const shuffled = [...targetDb].sort(() => 0.5 - Math.random());
        quizState = { list: shuffled.slice(0, 5), current: 0, score: 0 };

        document.getElementById('quiz-score').innerText = '0';
        document.getElementById('quiz-complete').classList.add('hidden');
        document.getElementById('quiz-feedback').classList.add('hidden');
        document.getElementById('quiz-card-content').classList.remove('hidden');
        renderQuiz();
    }

    function renderQuiz() {
        const q = quizState.list[quizState.current];
        document.getElementById('quiz-progress').innerText = `문제 ${quizState.current + 1} / ${quizState.list.length}`;
        document.getElementById('quiz-progress-bar').style.width = `${((quizState.current + 1) / quizState.list.length) * 100}%`;

        document.getElementById('quiz-card-content').classList.remove('hidden');
        document.getElementById('quiz-item-icon').innerText = q.icon;
        document.getElementById('quiz-question-title').innerText = q.q;
        document.getElementById('quiz-item-desc').innerHTML = `💡 힌트: ${q.desc}`;

        const container = document.getElementById('quiz-options-container');
        container.innerHTML = '';

        q.opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = `btn-hover-effect hero-font ${OPT_COLORS[idx]} text-white text-base py-4 px-4 rounded-xl shadow-xs border-b-4 border-black/20 w-full transition-transform active:scale-95`;
            btn.innerText = opt;
            btn.onclick = () => handleQuizAnswer(idx);
            container.appendChild(btn);
        });

        generate4CutComicFromQuiz(q);
    }

    function handleQuizAnswer(idx) {
        const q = quizState.list[quizState.current];
        const isCorrect = (idx === q.ans);
        generate4CutComicFromQuiz(q, true, comicState.current4CutData.chars);

        document.getElementById('quiz-card-content').classList.add('hidden');
        const fb = document.getElementById('quiz-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
            quizState.score += 20;
            addExp(20);
            document.getElementById('feedback-title').innerText = "정답입니다! (+20 EXP)";
            document.getElementById('feedback-title').className = "hero-font text-3xl text-emerald-600 mb-3";
            document.getElementById('feedback-icon').innerText = "🎉";
        } else {
            document.getElementById('feedback-title').innerText = "아쉽게 틀렸어요!";
            document.getElementById('feedback-title').className = "hero-font text-3xl text-rose-500 mb-3";
            document.getElementById('feedback-icon').innerText = "😅";
        }

        document.getElementById('quiz-score').innerText = quizState.score;
        document.getElementById('feedback-desc').innerText = q.exp;
    }

    function nextQuizQuestion() {
        quizState.current++;
        document.getElementById('quiz-feedback').classList.add('hidden');

        if (quizState.current < quizState.list.length) {
            renderQuiz();
        } else {
            document.getElementById('quiz-progress-bar').style.width = '100%';
            document.getElementById('quiz-complete').classList.remove('hidden');
            document.getElementById('final-score').innerText = quizState.score;
        }
    }

    function buildFaceAvatar(charObj) {
        return `
            <div class="character-avatar-ring bg-gradient-to-br ${charObj.bg} animate-float">
                <span class="text-3xl">${charObj.face}</span>
            </div>
        `;
    }

    function generate4CutComicFromQuiz(q, revealed = false, chars = null) {
        const char1 = chars ? chars[0] : FACE_CHARACTERS[Math.floor(Math.random() * FACE_CHARACTERS.length)];
        let char2 = chars ? chars[1] : FACE_CHARACTERS[Math.floor(Math.random() * FACE_CHARACTERS.length)];
        while (!chars && char2 === char1) {
            char2 = FACE_CHARACTERS[Math.floor(Math.random() * FACE_CHARACTERS.length)];
        }

        comicState.current4CutData = {
            chars: [char1, char2],
            title: `📖 ${char1.name}와 ${char2.name}의 ${q.name} 동화 이야기`,
            cuts: [
                {
                    cutNum: 1,
                    char: char1,
                    speech: `어라? ${q.name} 친구가 버려져 있어! 어떻게 배출하지?`,
                    desc: `${char1.name}가 고민을 하고 있어요.`
                },
                {
                    cutNum: 2,
                    char: char2,
                    speech: `힌트! "${q.desc}"`,
                    desc: `${char2.name}가 배출 힌트를 전해요.`
                },
                {
                    cutNum: 3,
                    char: char1,
                    speech: revealed ? `정답은 '${q.opts[q.ans]}' ! 깔끔하게 배출 완료!` : `문제를 풀면 정답을 알려줄게! 두근두근~`,
                    desc: `히어로가 분리수거를 멋지게 해냈어요.`
                },
                {
                    cutNum: 4,
                    char: char2,
                    speech: revealed ? `지구를 지켜줘서 고마워! ${q.exp}` : `정답을 맞혀 보면 이야기가 이어져요!`,
                    desc: `친구들이 다 함께 기뻐해요!`
                }
            ]
        };

        render4CutComic();
    }

    /* 에코시어터 4컷 그린 톤 렌더링 */
    function render4CutComic() {
        const container = document.getElementById('comic-4cut-container');
        const titleEl = document.getElementById('comic-main-title');
        if(!container || !comicState.current4CutData) return;

        if(titleEl) titleEl.innerText = comicState.current4CutData.title;

        container.innerHTML = comicState.current4CutData.cuts.map((c, index) => {
            return `
                <div onclick="HeroApp.speakSingleCut(${index})" class="comic-cut-card bg-white hover:bg-emerald-50 transition-all animate-popIn group">
                    <div class="flex justify-between items-center mb-0.5">
                        <span class="bg-emerald-500 group-hover:bg-teal-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                            CUT 0${c.cutNum}
                        </span>
                        <span class="text-[10px] font-bold text-emerald-900 truncate">
                            🔊 ${c.char.name}
                        </span>
                    </div>

                    <div class="my-auto py-1 text-center flex flex-col items-center justify-center gap-1">
                        <div class="speech-bubble w-full">
                            "${c.speech}"
                        </div>
                        ${buildFaceAvatar(c.char)}
                    </div>

                    <div class="text-[10px] text-slate-600 font-bold bg-emerald-50/70 p-1 rounded-xl border border-emerald-100 text-center truncate">
                        📌 ${c.desc}
                    </div>
                </div>
            `;
        }).join('');
    }

    function speakSingleCut(cutIndex) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        comicState.isPlayingFullVoice = false;
        updateFullVoiceBtnUI();

        if(!comicState.current4CutData || !comicState.current4CutData.cuts[cutIndex]) return;
        const cut = comicState.current4CutData.cuts[cutIndex];

        playSoftBgm();

        const textToSpeak = cut.speech;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ko-KR';
        utterance.pitch = 2;
        utterance.rate = 1.5;

        utterance.onend = () => { stopSoftBgm(); };
        utterance.onerror = () => { stopSoftBgm(); };

        window.speechSynthesis.speak(utterance);
    }

    function toggleFullComicVoice() {
        if (!window.speechSynthesis) {
            showAlert("알림", "음성 기능을 지원하지 않는 브라우저입니다.");
            return;
        }

        if (window.speechSynthesis.speaking || comicState.isPlayingFullVoice) {
            window.speechSynthesis.cancel();
            comicState.isPlayingFullVoice = false;
            stopSoftBgm();
            updateFullVoiceBtnUI();
        } else {
            comicState.isPlayingFullVoice = true;
            updateFullVoiceBtnUI();
            readFull4CutComicVoice();
        }
    }

    function updateFullVoiceBtnUI() {
        const btnIcon = document.getElementById('full-voice-icon');
        const btnText = document.getElementById('full-voice-btn-text');
        if(!btnIcon || !btnText) return;

        if (comicState.isPlayingFullVoice) {
            btnIcon.className = 'fa-solid fa-circle-pause text-xl animate-pulse';
            btnText.innerText = '동화 그만 듣기';
        } else {
            btnIcon.className = 'fa-solid fa-circle-play text-xl';
            btnText.innerText = '동화 전체 듣기 (처음부터 끝까지 듣기)';
        }
    }

    function readFull4CutComicVoice() {
        if(!comicState.current4CutData) return;
        playSoftBgm();
        let cutQueue = [...comicState.current4CutData.cuts];

        function speakNextQueue() {
            if (cutQueue.length === 0 || !comicState.isPlayingFullVoice) {
                comicState.isPlayingFullVoice = false;
                stopSoftBgm();
                updateFullVoiceBtnUI();
                return;
            }
            const cut = cutQueue.shift();

            const textToSpeak = cut.speech;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'ko-KR';
            utterance.pitch = 1.35;
            utterance.rate = 0.88;

            utterance.onend = () => {
                if (cutQueue.length > 0 && comicState.isPlayingFullVoice) {
                    setTimeout(speakNextQueue, 300);
                } else {
                    comicState.isPlayingFullVoice = false;
                    stopSoftBgm();
                    updateFullVoiceBtnUI();
                }
            };

            utterance.onerror = () => {
                comicState.isPlayingFullVoice = false;
                stopSoftBgm();
                updateFullVoiceBtnUI();
            };

            window.speechSynthesis.speak(utterance);
        }

        speakNextQueue();
    }

    function setOxCategory(categoryKey) {
        state.activeOxCategory = categoryKey;
        const onCls = "flex-1 py-3 px-5 rounded-xl font-bold hero-font text-base transition-all bg-emerald-500 text-white shadow-md flex items-center justify-center gap-2";
        const offCls = "flex-1 py-3 px-5 rounded-xl font-bold hero-font text-base transition-all text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-2";
        document.getElementById('ox-subtab-recycle').className = (categoryKey === 'recycle') ? onCls : offCls;
        document.getElementById('ox-subtab-carbon').className = (categoryKey === 'carbon') ? onCls : offCls;
        startOxQuiz();
    }

    function startOxQuiz() {
        const targetDb = (state.activeOxCategory === 'carbon') ? CARBON_OX_DB : RECYCLE_OX_DB;
        const shuffled = [...targetDb].sort(() => 0.5 - Math.random());
        oxState = { list: shuffled.slice(0, 5), current: 0, score: 0 };

        document.getElementById('ox-score').innerText = '0';
        document.getElementById('ox-complete').classList.add('hidden');
        document.getElementById('ox-feedback').classList.add('hidden');
        document.getElementById('ox-card-content').classList.remove('hidden');
        renderOxQuestion();
    }

    function renderOxQuestion() {
        const item = oxState.list[oxState.current];
        document.getElementById('ox-progress').innerText = `문제 ${oxState.current + 1} / ${oxState.list.length}`;
        document.getElementById('ox-progress-bar').style.width = `${((oxState.current + 1) / oxState.list.length) * 100}%`;
        document.getElementById('ox-question-text').innerText = ` Q. ${item.q}`;
    }

    function handleOxAnswer(userChoice) {
        const item = oxState.list[oxState.current];
        const isCorrect = (userChoice === item.ans);

        document.getElementById('ox-card-content').classList.add('hidden');
        const fb = document.getElementById('ox-feedback');
        fb.classList.remove('hidden');

        if (isCorrect) {
            oxState.score += 20;
            addExp(20);
            document.getElementById('ox-feedback-title').innerText = "정답입니다! (+20 EXP)";
            document.getElementById('ox-feedback-title').className = "hero-font text-3xl text-emerald-600 mb-3";
            document.getElementById('ox-feedback-icon').innerText = "🎉";
        } else {
            document.getElementById('ox-feedback-title').innerText = "아쉽게 틀렸어요!";
            document.getElementById('ox-feedback-title').className = "hero-font text-3xl text-rose-500 mb-3";
            document.getElementById('ox-feedback-icon').innerText = "😅";
        }

        document.getElementById('ox-score').innerText = oxState.score;
        document.getElementById('ox-feedback-desc').innerText = item.exp;
    }

    function nextOxQuestion() {
        oxState.current++;
        document.getElementById('ox-feedback').classList.add('hidden');

        if (oxState.current < oxState.list.length) {
            document.getElementById('ox-card-content').classList.remove('hidden');
            renderOxQuestion();
        } else {
            document.getElementById('ox-progress-bar').style.width = '100%';
            document.getElementById('ox-complete').classList.remove('hidden');
            document.getElementById('ox-final-score').innerText = oxState.score;
        }
    }

    const MISSIONS_DB = [
        { id: 1, title: "안 쓰는 플러그 뽑아 대기전력 차단하기", desc: "사용하지 않는 전자기기 플러그를 뽑아서 탄소를 아껴요.", exp: 25 },
        { id: 2, title: "외출할 때 내 전용 텀블러/물병 챙기기", desc: "일회용 컵 대신 개인 텀블러를 챙겨요!", exp: 30 },
        { id: 3, title: "점심 남기지 않고 잔반 0 달성하기", desc: "음식물 쓰레기를 줄이면 지구를 구해요!", exp: 25 }
    ];

    const STORAGE_KEY = 'ecohero-save-v1';

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                exp: state.exp,
                missionsCompleted: state.missionsCompleted,
                completedMissions: state.completedMissions,
                nickname: state.nickname,
                avatar: state.avatar
            }));
        } catch (e) {}
    }

    function loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!saved) return;
            state.exp = Number(saved.exp) || 0;
            state.completedMissions = Array.isArray(saved.completedMissions) ? saved.completedMissions : [];
            state.missionsCompleted = state.completedMissions.length;
            state.nickname = saved.nickname || state.nickname;
            state.avatar = saved.avatar || state.avatar;
        } catch (e) {}

        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (state.exp >= LEVELS[i].exp) { state.level = i + 1; break; }
        }
        document.getElementById('hero-level-badge').innerText = `Lv. ${state.level} ${LEVELS[state.level - 1].title}`;
        document.getElementById('hero-nickname-input').value = state.nickname;
        document.getElementById('header-hero-name').innerText = state.nickname;
        document.getElementById('main-avatar-icon').innerText = state.avatar;
        document.getElementById('header-avatar-emoji').innerText = state.avatar;
    }

    function renderMissions() {
        const list = document.getElementById('mission-list');
        if(!list) return;

        list.innerHTML = MISSIONS_DB.map(m => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div class="space-y-1 text-center sm:text-left">
                    <div class="hero-font text-lg text-slate-800 flex items-center gap-2 justify-center sm:justify-start">
                        <span>🎯</span> ${m.title}
                    </div>
                    <p class="text-xs text-slate-500 font-bold">${m.desc}</p>
                </div>
                ${state.completedMissions.includes(m.id)
                    ? `<button type="button" disabled class="shrink-0 hero-font bg-slate-300 text-slate-600 px-5 py-2.5 rounded-xl cursor-not-allowed text-sm">완료됨! ✨</button>`
                    : `<button onclick="HeroApp.completeMission(${m.id}, ${m.exp}, this)" class="shrink-0 hero-font bg-emeraldHero text-white px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition shadow-md text-sm">
                    미션 완료 (+${m.exp} EXP)
                </button>`}
            </div>
        `).join('');
        document.getElementById('mission-progress-text').innerText = `${state.missionsCompleted} / ${MISSIONS_DB.length}`;
    }

    function completeMission(id, exp, btn) {
        if(btn.disabled) return;
        btn.disabled = true;
        btn.innerText = "완료됨! ✨";
        btn.className = "shrink-0 hero-font bg-slate-300 text-slate-600 px-5 py-2.5 rounded-xl cursor-not-allowed text-sm";

        state.completedMissions.push(id);
        state.missionsCompleted++;
        addExp(exp);

        document.getElementById('mission-progress-text').innerText = `${state.missionsCompleted} / ${MISSIONS_DB.length}`;
        showAlert("미션 성공! ⭐", `${exp} EXP를 획득했습니다!`);
    }

    function checkLevelUp() {
        let newLv = 1;
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (state.exp >= LEVELS[i].exp) { newLv = i + 1; break; }
        }

        if (newLv > state.level) {
            state.level = newLv;
            const badge = document.getElementById('hero-level-badge');
            if (badge) badge.innerText = `Lv. ${state.level} ${LEVELS[state.level-1].title}`;
            showAlert("레벨 업! 🎉", `${LEVELS[state.level-1].title}(으)로 승급했습니다!`);
        }
    }

    function updateUI() {
        const scoreEl = document.getElementById('hero-total-score');
        const countEl = document.getElementById('hero-mission-count');
        if (scoreEl) scoreEl.innerText = state.exp;
        if (countEl) countEl.innerText = state.missionsCompleted;

        updateRanking();
    }

    function addExp(amount) {
        state.exp += amount;
        saveState();
        updateUI();
        checkLevelUp();
    }

    function renderSchoolRanking() {
        const container = document.getElementById('school-ranking-container');
        if (!container) return;

        const schoolList = state.nearbySchools.length >= 3 ? state.nearbySchools : [
            { rank: 1, name: '제주아라초등학교', score: '15,800 EXP', students: '340명 참여' },
            { rank: 2, name: '신제주초등학교', score: '13,400 EXP', students: '290명 참여' },
            { rank: 3, name: '제주중앙초등학교', score: '10,200 EXP', students: '210명 참여' }
        ];

        const first = schoolList.find(s => s.rank === 1) || schoolList[0];
        const second = schoolList.find(s => s.rank === 2) || schoolList[1];
        const third = schoolList.find(s => s.rank === 3) || schoolList[2];

        container.innerHTML = `
            <div class="flex-1 flex flex-col items-center justify-end max-w-[170px] sm:max-w-[210px] animate-popIn">
                <div class="text-center space-y-1 mb-2">
                    <span class="text-2xl sm:text-3xl">🌳🌳</span>
                    <div class="bg-slate-800 text-slate-100 font-bold hero-font text-xs sm:text-sm px-2.5 py-1 rounded-full shadow-md truncate">
                        ${second.name.replace('🏫 ', '')}
                    </div>
                    <div class="text-emerald-700 font-bold hero-font text-sm sm:text-base">${second.score}</div>
                </div>
                <div class="w-full h-32 sm:h-40 podium-box-2nd rounded-t-2xl flex flex-col items-center justify-center text-white hero-font p-2">
                    <span class="text-3xl sm:text-4xl rank-outline-text rank-basic-2nd">2등</span>
                    <span class="text-xs sm:text-sm text-slate-100 font-bold">에코 공원</span>
                </div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-end max-w-[190px] sm:max-w-[240px] -translate-y-2 animate-popIn z-10">
                <div class="text-center space-y-1 mb-2 relative">
                    <span class="text-3xl sm:text-4xl animate-bounce">🌲🌳🌲</span>
                    <div class="bg-amber-500 text-slate-900 font-bold hero-font text-sm sm:text-base px-3 py-1 rounded-full shadow-lg border-2 border-white truncate">
                        👑 ${first.name.replace('🏫 ', '')}
                    </div>
                    <div class="text-amber-800 font-bold hero-font text-lg sm:text-xl">${first.score}</div>
                </div>
                <div class="w-full h-44 sm:h-52 podium-box-1st rounded-t-3xl flex flex-col items-center justify-center hero-font p-2">
                    <span class="text-4xl sm:text-5xl rank-outline-text rank-1st-gold animate-pulse">1등</span>
                    <span class="text-xs sm:text-sm text-amber-950 font-bold mt-1">거대한 에코 숲</span>
                </div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-end max-w-[160px] sm:max-w-[200px] animate-popIn">
                <div class="text-center space-y-1 mb-2">
                    <span class="text-2xl sm:text-3xl">🎡🌳</span>
                    <div class="bg-orange-800 text-orange-100 font-bold hero-font text-xs sm:text-sm px-2.5 py-1 rounded-full shadow-md truncate">
                        ${third.name.replace('🏫 ', '')}
                    </div>
                    <div class="text-orange-800 font-bold hero-font text-sm sm:text-base">${third.score}</div>
                </div>
                <div class="w-full h-24 sm:h-32 podium-box-3rd rounded-t-2xl flex flex-col items-center justify-center text-white hero-font p-2">
                    <span class="text-2xl sm:text-3xl rank-outline-text rank-basic-3rd">3등</span>
                    <span class="text-[11px] sm:text-xs text-orange-100 font-bold">에코 놀이터</span>
                </div>
            </div>
        `;
    }

    function updateRanking() {
        const container = document.getElementById('ranking-container');
        if (!container) return;

        const rankings = [
            { name: '에코 마스터', score: 1500, emoji: '👑' },
            { name: state.nickname, score: state.exp, emoji: document.getElementById('main-avatar-icon').innerText },
            { name: '초보 기후히어로', score: 120, emoji: '🌱' }
        ].sort((a, b) => b.score - a.score);

        container.innerHTML = rankings.map((r, i) => `
            <div class="bg-white rounded-2xl p-5 shadow-md border ${i === 0 ? 'border-amber-300 bg-gradient-to-b from-amber-50 to-white scale-105' : 'border-slate-200'} w-full md:w-1/3 text-center transition-transform">
                <div class="text-3xl mb-1">${r.emoji}</div>
                <div class="font-bold text-slate-800 text-lg mb-0.5 hero-font">${i + 1}위</div>
                <div class="text-slate-800 text-base mb-2 font-bold truncate hero-font">${r.name}</div>
                <div class="text-emerald-600 font-bold hero-font text-xl">${r.score} EXP</div>
            </div>
        `).join('');

        renderSchoolRanking();
    }

    const alertQueue = [];
    let isAlertOpen = false;

    function showAlert(title, desc) {
        alertQueue.push({ title, desc });
        if (!isAlertOpen) openNextAlert();
    }

    function openNextAlert() {
        const next = alertQueue.shift();
        if (!next) return;
        isAlertOpen = true;
        const { title, desc } = next;
        document.getElementById('alert-title').innerText = title;
        document.getElementById('alert-desc').innerText = desc;
        const modal = document.getElementById('alert-modal');
        const content = document.getElementById('alert-content');
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
        }, 10);
    }

    function closeAlert() {
        const modal = document.getElementById('alert-modal');
        const content = document.getElementById('alert-content');
        modal.classList.add('opacity-0');
        content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            isAlertOpen = false;
            openNextAlert();
        }, 300);
    }

    function openAvatarModal() {
        const modal = document.getElementById('avatar-modal');
        const content = document.getElementById('avatar-content');
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
        }, 10);
    }

    function closeAvatarModal() {
        const modal = document.getElementById('avatar-modal');
        const content = document.getElementById('avatar-content');
        modal.classList.add('opacity-0');
        content.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    function selectEmojiAvatar(emoji) {
        state.avatar = emoji;
        saveState();
        document.getElementById('main-avatar-icon').innerText = emoji;
        document.getElementById('main-avatar-img').classList.add('hidden');
        document.getElementById('main-avatar-icon').classList.remove('hidden');
        document.getElementById('header-avatar-emoji').innerText = emoji;
        closeAvatarModal();
    }

    function handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('main-avatar-img').src = e.target.result;
                document.getElementById('main-avatar-img').classList.remove('hidden');
                document.getElementById('main-avatar-icon').classList.add('hidden');
                document.getElementById('header-avatar-emoji').innerText = '🖼️';
                closeAvatarModal();
            };
            reader.readAsDataURL(file);
        }
    }

    function startAiScan(imgUrl, categoryKey, isExplicitTrash = false) {
        const idleBox = document.getElementById('scanner-idle');
        const imgEl = document.getElementById('scanner-image');
        const laserEl = document.getElementById('scanner-laser');
        const loadingEl = document.getElementById('scanner-loading');
        const resultBox = document.getElementById('scanner-result');

        if(idleBox) idleBox.classList.add('hidden');
        if(imgEl) {
            imgEl.src = imgUrl;
            imgEl.classList.remove('hidden');
        }
        if(laserEl) laserEl.classList.remove('hidden');
        if(loadingEl) loadingEl.classList.remove('hidden');
        if(resultBox) resultBox.classList.add('hidden');

        setTimeout(() => {
            if(laserEl) laserEl.classList.add('hidden');
            if(loadingEl) loadingEl.classList.add('hidden');
            renderScanResult(categoryKey, isExplicitTrash);
        }, 1200);
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const categories = ["plastic", "paper", "can", "trash"];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                startAiScan(e.target.result, randomCategory, randomCategory === "trash");
            };
            reader.readAsDataURL(file);
        }
    }

    function setScanResultTab(tabName) {
        state.activeScanTab = tabName;
        const tabs = ['how', 'story', 'usage'];
        tabs.forEach(t => {
            const btn = document.getElementById(`scan-tab-btn-${t}`);
            const content = document.getElementById(`scan-tab-content-${t}`);
            if (btn && content) {
                if (t === tabName) {
                    btn.className = "flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-lg transition-all bg-emerald-500 text-white shadow-sm hero-font";
                    content.classList.remove('hidden');
                } else {
                    btn.className = "flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-slate-400 hover:text-white hero-font";
                    content.classList.add('hidden');
                }
            }
        });
    }

    function claimScanExp(btn) {
        if (btn.disabled) return;
        btn.disabled = true;
        btn.className = "w-full bg-slate-600 text-slate-300 font-bold hero-font text-lg py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-2";
        btn.innerHTML = "<span>경험치를 받았어요! ✨</span>";
        addExp(20);
        showAlert('기후행동 완료! 🎉', '탄소를 아끼고 소나무를 심어주셔서 감사해요! +20 EXP');
    }

    function renderScanResult(key, isTrash) {
        const guide = WASTE_GUIDE_DB[key] || WASTE_GUIDE_DB["plastic"];
        const resultBox = document.getElementById('scanner-result');
        if (!resultBox) return;

        const confidence = Math.floor(88 + Math.random() * 11);

        resultBox.innerHTML = `
            <div class="bg-slate-800 rounded-2xl p-5 border border-slate-700 space-y-4 animate-popIn">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-700">
                    <div class="flex items-center gap-2">
                        <span class="bg-emerald-500 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider hero-font">
                            AI 분석 결과
                        </span>
                        <h4 class="hero-font text-2xl text-emerald-300">${guide.title}</h4>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full font-bold hero-font">
                            신뢰도 ${confidence}%
                        </span>
                        <span class="text-xs font-bold px-3 py-1 rounded-full hero-font ${isTrash ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}">
                            ${guide.cat}
                        </span>
                    </div>
                </div>

                <div class="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/80">
                    <button id="scan-tab-btn-how" onclick="HeroApp.setScanResultTab('how')" class="flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-lg transition-all bg-emerald-500 text-white shadow-sm hero-font">
                        📋 배출 방법
                    </button>
                    <button id="scan-tab-btn-story" onclick="HeroApp.setScanResultTab('story')" class="flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-slate-400 hover:text-white hero-font">
                        🌱 탄소 감축 효과
                    </button>
                    <button id="scan-tab-btn-usage" onclick="HeroApp.setScanResultTab('usage')" class="flex-1 text-center py-2 text-xs sm:text-sm font-bold rounded-lg transition-all text-slate-400 hover:text-white hero-font">
                        🎨 새활용 아이디어
                    </button>
                </div>

                <div id="scan-tab-content-how" class="space-y-3 pt-1">
                    <div class="space-y-2">
                        <span class="text-xs text-emerald-400 font-bold block mb-1 hero-font">
                            <i class="fa-solid fa-list-check mr-1"></i> 올바른 분리수거 순서:
                        </span>
                        <ul class="space-y-2">
                            ${guide.steps.map((step, idx) => `
                                <li class="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl text-xs sm:text-sm text-slate-200 border border-slate-700/50">
                                    <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 hero-font text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                                    <span class="leading-relaxed font-bold">${step}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200/90 leading-relaxed space-y-1">
                        <strong class="text-amber-400 font-bold flex items-center gap-1.5 text-xs hero-font">
                            <i class="fa-solid fa-triangle-exclamation"></i> 잠깐! 주의할 점
                        </strong>
                        <p class="pl-5 text-slate-300 font-bold">${guide.caution}</p>
                    </div>
                </div>

                <div id="scan-tab-content-story" class="hidden pt-1 space-y-3">
                    <div class="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-xs sm:text-sm text-emerald-100 leading-relaxed space-y-2">
                        <div class="flex items-center gap-2 hero-font text-emerald-300 text-base">
                            <span>🌱</span> 지구를 구하는 탄소 이야기
                        </div>
                        <p class="text-slate-300 leading-loose font-bold">${guide.story}</p>
                    </div>
                </div>

                <div id="scan-tab-content-usage" class="hidden pt-1 space-y-3">
                    <div class="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 text-xs sm:text-sm text-indigo-100 leading-relaxed space-y-2">
                        <div class="flex items-center gap-2 hero-font text-indigo-300 text-base">
                            <span>💡</span> 꼬마 히어로의 DIY 새활용
                        </div>
                        <p class="text-slate-300 leading-loose font-bold">${guide.usage}</p>
                    </div>
                </div>

                <button onclick="HeroApp.claimScanExp(this)" class="btn-hover-effect w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold hero-font text-lg py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                    <span>실천 완료하고 경험치 받기</span> <i class="fa-solid fa-bolt"></i>
                </button>
            </div>
        `;

        resultBox.classList.remove('hidden');
        setScanResultTab('how');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const nameInput = document.getElementById('hero-nickname-input');
        if(nameInput) {
            nameInput.addEventListener('input', (e) => {
                state.nickname = e.target.value || '초록이 히어로';
                saveState();
                const headerName = document.getElementById('header-hero-name');
                if(headerName) headerName.innerText = state.nickname;
                updateRanking();
            });
        }

        loadState();
        filterEcoGuide('all');
        renderMissions();
        startQuiz();
        startOxQuiz();
        updateUI();
        initGeolocationAndSchools();
    });

    return {
        switchTab,
        selectGame,
        focusIframe,
        toggleFullscreen,
        filterEcoGuide,
        searchEcoGuide,
        openAvatarModal,
        closeAvatarModal,
        selectEmojiAvatar,
        handleAvatarUpload,
        handleImageUpload,
        startAiScan,
        setScanResultTab,
        claimScanExp,
        setQuizCategory,
        startQuiz,
        nextQuizQuestion,
        setOxCategory,
        startOxQuiz,
        handleOxAnswer,
        nextOxQuestion,
        completeMission,
        addExp,
        showAlert,
        closeAlert,
        speakSingleCut,
        toggleFullComicVoice
    };
})();
