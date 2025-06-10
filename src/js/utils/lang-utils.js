// lang-utils.js (or integrated into your main script)

const DEFAULT_LANG = 'en';
//let currentLang = localStorage.getItem('portfolioLang') || DEFAULT_LANG;

export function setLanguage(lang) {
    if (['en', 'fr'].includes(lang)) {
        //currentLang = lang;
        localStorage.setItem('portfolioLang', lang);
        // Trigger a re-render or content load
        //loadContentForLanguage(lang);
    }
}

export function getLanguage() {
    return localStorage.getItem('portfolioLang') || DEFAULT_LANG;
}