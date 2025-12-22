// ./js/settings.js

const LANGUAGE_KEY = "language";
const THEME_KEY = "theme";
const DEFAULT_LANGUAGE = "ko";
const DEFAULT_THEME = "dark";

const langButtons = document.querySelectorAll(".lang-btn");
const themeToggleButton = document.getElementById("theme-toggle");

const translations = {
  en: {
    "login.placeholder": "What is your name?",
    "login.button": "Log In",
    "todo.placeholder": "Write a To Do and Press Enter",
  },
  ko: {
    "login.placeholder": "이름을 입력하세요",
    "login.button": "로그인",
    "todo.placeholder": "할 일을 입력하고 Enter를 누르세요",
  },
};

function getCurrentLanguage() {
  const stored = localStorage.getItem(LANGUAGE_KEY);
  return stored === "en" || stored === "ko" ? stored : DEFAULT_LANGUAGE;
}

function getCurrentTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // value (버튼 텍스트 등)
  document.querySelectorAll("[data-i18n-value]").forEach((el) => {
    const key = el.dataset.i18nValue;
    if (dict[key]) {
      el.value = dict[key];
    }
  });
}

function setLanguage(lang) {
  const targetLang = lang === "en" ? "en" : "ko";
  localStorage.setItem(LANGUAGE_KEY, targetLang);

  // 버튼 활성화 표시
  langButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === targetLang);
  });

  applyTranslations(targetLang);

  // 인사말 다시 그리기
  if (typeof window.updateGreetingLanguage === "function") {
    window.updateGreetingLanguage();
  }
}

function applyTheme(theme) {
  const targetTheme = theme === "light" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, targetTheme);

  document.body.classList.toggle("theme-light", targetTheme === "light");
  document.body.classList.toggle("theme-dark", targetTheme === "dark");

  if (themeToggleButton) {
    themeToggleButton.textContent = targetTheme === "light" ? "🌙" : "☀️";
  }
}

// 이벤트 바인딩
langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const { lang } = btn.dataset;
    setLanguage(lang);
  });
});

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
    const current = getCurrentTheme();
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

// 초기 적용
setLanguage(getCurrentLanguage());
applyTheme(getCurrentTheme());
