const generateBtn = document.getElementById('generate-btn');
const stocksContainer = document.getElementById('stocks-container');
const themeToggle = document.getElementById('theme-toggle');
const dateDisplay = document.getElementById('date-display');

const kStocks = [
    { name: '삼성전자', reason: '글로벌 반도체 수요 회복 및 HBM3E 양산 가속화로 2026년 영업이익 전년 대비 15% 이상 증가 예상', return: '+5.2%' },
    { name: 'SK하이닉스', reason: 'HBM 시장 점유율 50% 이상 유지 및 차세대 메모리 선점으로 영업이익률 30%대 진입 기대', return: '+7.8%' },
    { name: '현대차', reason: '하이브리드 판매 비중 20% 확대 및 미국 전기차 전용 공장 가동에 따른 점유율 0.5%p 상승 전망', return: '+4.5%' },
    { name: 'NAVER', reason: '하이퍼클로바X B2B 유료 고객사 1,000개 돌파 및 커머스 부문 테이크레이트 2%대 안착', return: '+6.1%' },
    { name: '카카오', reason: '카카오톡 탭 개편을 통한 일일 활성 사용자(DAU) 5% 증가 및 AI 기반 광고 타겟팅 효율 20% 개선', return: '+5.5%' },
    { name: 'LG에너지솔루션', reason: '미국 IRA AMPC 보조금 수혜액 분기당 5,000억 원 상회 및 주요 고객사 가동률 85% 회복', return: '+8.3%' },
    { name: '셀트리온', reason: '짐펜트라 미국 시장 점유율 10% 조기 달성 및 합병 시너지로 인한 판관비 10% 절감 효과', return: '+6.7%' },
    { name: 'POSCO홀딩스', reason: '광양 리튬 공장 생산 수율 90% 달성 및 이차전지 소재 부문 매출 비중 30% 상향 조정', return: '+5.9%' },
    { name: '기아', reason: 'RV 및 친환경차 판매 비중 60% 돌파 및 사상 최대 수준의 영업이익률 12% 유지 전망', return: '+4.8%' },
    { name: '한화에어로스페이스', reason: 'K-방산 수출 수주 잔고 30조 원 돌파 및 폴란드향 2차 실행계약에 따른 실적 퀀텀 점프', return: '+9.2%' },
    { name: 'LG화학', reason: '양극재 외 분리막, CNT 등 신규 소재 매출 비중 15% 확대 및 원가 경쟁력 강화', return: '+5.1%' },
    { name: '삼성바이오로직스', reason: '누적 수주 금액 120억 달러 돌파 및 5공장 가동 시 총 생산 능력 78.4만 리터로 세계 1위 유지', return: '+4.2%' },
    { name: 'KB금융', reason: '총주주환원율 40% 이상 유지 및 순이자마진(NIM) 방어로 인한 ROE 10%대 회복', return: '+3.8%' },
    { name: '신한지주', reason: '비은행 부문 순이익 기여도 45% 달성 및 분기 균등 배당을 통한 주주 가치 제고', return: '+3.5%' },
    { name: '에코프로비엠', reason: '북미향 NCM 양극재 장기 공급 계약 기반으로 2026년 생산 Capa 19만 톤 확대', return: '+10.2%' }
];

function setDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateDisplay.textContent = today.toLocaleDateString('ko-KR', options);
}

function getRandomStocks(count) {
    const shuffled = [...kStocks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayStocks(stocks) {
    stocksContainer.innerHTML = '';
    stocks.forEach((stock, index) => {
        const card = document.createElement('div');
        card.classList.add('stock-card');
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="stock-info">
                <div class="stock-name">${stock.name}</div>
                <div class="stock-reason">${stock.reason}</div>
            </div>
            <div class="stock-return">분석 목표 ${stock.return}</div>
        `;
        stocksContainer.appendChild(card);
    });
}

// Theme Toggle logic
function updateThemeIcon(isDark) {
    themeToggle.textContent = isDark ? '☀️' : '🌙';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default is light, only add dark-mode if saved as dark
    const isDark = savedTheme === 'dark';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon(isDark);
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
});

generateBtn.addEventListener('click', () => {
    stocksContainer.scrollIntoView({ behavior: 'smooth' });
    displayStocks(getRandomStocks(3));
});

// Initialize
initTheme();
setDate();
displayStocks(getRandomStocks(3));