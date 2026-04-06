const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const labelContainer = document.getElementById('label-container');
const retryBtn = document.getElementById('retry-btn');
const themeToggle = document.getElementById('theme-toggle');
const dateDisplay = document.getElementById('date-display');

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/24cM6bbr-/";
let model, maxPredictions;

// Initialize Teachable Machine Model
async function init() {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    } catch (error) {
        console.error("Model loading failed:", error);
    }
}

// Handle Image Upload
uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            predict();
        };
        reader.readAsDataURL(file);
    }
});

// Run Prediction
async function predict() {
    if (!model) await init();

    loading.style.display = 'block';
    resultContainer.style.display = 'none';

    // Wait a bit for the UI to update
    await new Promise(resolve => setTimeout(resolve, 1000));

    const prediction = await model.predict(imagePreview);
    prediction.sort((a, b) => b.probability - a.probability);

    displayResults(prediction);
}

// Display Results
function displayResults(prediction) {
    loading.style.display = 'none';
    resultContainer.style.display = 'block';
    labelContainer.innerHTML = '';

    prediction.forEach(p => {
        const percentage = (p.probability * 100).toFixed(0);
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <div class="result-header">
                <span>${p.className}</span>
                <span>${percentage}%</span>
            </div>
            <div class="bar-container">
                <div class="bar" style="width: ${percentage}%"></div>
            </div>
        `;
        labelContainer.appendChild(resultItem);
    });

    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Retry
retryBtn.addEventListener('click', () => {
    imagePreview.style.display = 'none';
    imagePreview.src = '#';
    resultContainer.style.display = 'none';
    fileInput.value = '';
    uploadArea.scrollIntoView({ behavior: 'smooth' });
});

// Utility Functions
function setDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateDisplay.textContent = today.toLocaleDateString('ko-KR', options);
}

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

// Initialize
initTheme();
setDate();
init(); // Pre-load model
