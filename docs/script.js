// Get language from localStorage or default to browser language
function getInitialLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        return savedLang;
    }
    
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
        // Check if it's Traditional Chinese
        if (browserLang.includes('TW') || browserLang.includes('HK')) {
            return 'zh-TW';
        }
        return 'zh';
    }
    
    return 'en';
}

// Set initial language
let currentLanguage = getInitialLanguage();

// Update active language button
function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Translate page content
function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update active language button
    updateLanguageButtons();
    
    // Save preference
    localStorage.setItem('preferredLanguage', currentLanguage);
}

// Language switcher event listeners
document.addEventListener('DOMContentLoaded', function() {
    translatePage();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentLanguage = this.dataset.lang;
            translatePage();
        });
    });
});

