const generateBtn = document.getElementById('generate-btn');
const stocksContainer = document.getElementById('stocks-container');
const themeToggle = document.getElementById('theme-toggle');
const dateDisplay = document.getElementById('date-display');

const kStocks = [
    { name: '삼성전자', reason: '반도체 업황 턴어라운드 기대감', return: '+5.2%' },
    { name: 'SK하이닉스', reason: 'HBM 수요 폭발적 증가', return: '+7.8%' },
    { name: '현대차', reason: '북미 전기차 시장 점유율 확대', return: '+4.5%' },
    { name: 'NAVER', reason: 'AI 서비스 본격화 및 실적 개선', return: '+6.1%' },
    { name: '카카오', reason: '핵심 사업 수익성 회복 전망', return: '+5.5%' },
    { name: 'LG에너지솔루션', reason: '미국 IRA 혜택 본격화', return: '+8.3%' },
    { name: '셀트리온', reason: '합병 시너지 및 신약 파이프라인', return: '+6.7%' },
    { name: 'POSCO홀딩스', reason: '이차전지 소재 밸류체인 완성', return: '+5.9%' },
    { name: '기아', reason: 'SUV 판매 호조 및 환율 효과', return: '+4.8%' },
    { name: '한화에어로스페이스', reason: '방산 수출 수주 잔고 증가', return: '+9.2%' }
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
            <div class="stock-return">예상 ${stock.return}</div>
        `;
        stocksContainer.appendChild(card);
    });
}

// Theme Toggle logic
function updateThemeIcon(isLight) {
    themeToggle.textContent = isLight ? '☀️' : '🌙';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    if (isLight) {
        document.body.classList.add('light-mode');
    }
    updateThemeIcon(isLight);
}

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
});

generateBtn.addEventListener('click', () => {
    const recommendedStocks = getRandomStocks(3);
    displayStocks(recommendedStocks);
});

// Initialize
initTheme();
setDate();
displayStocks(getRandomStocks(3));