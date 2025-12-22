// ./js/greetings.js

const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input[type='text']");
const greetingElement = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
// const LANGUAGE_KEY = "language";

function getCurrentLanguage() {
  const stored = localStorage.getItem("language");
  return stored === "en" || stored === "ko" ? stored : "ko";
}

function getGreetingMessage(username) {
  const lang = getCurrentLanguage();
  if (lang === "en") {
    return `Hello, ${username} 👋`;
  }
  return `${username}님 안녕하세요 👋`;
}

function saveUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

function paintGreeting(username) {
  if (!username) return;
  greetingElement.textContent = getGreetingMessage(username);
  greetingElement.classList.remove(HIDDEN_CLASSNAME);
}

function handleLoginSubmit(event) {
  event.preventDefault();

  const username = loginInput.value.trim();
  if (!username) return;

  saveUsername(username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreeting(username);
}

// 앱 초기 진입 시 실행
const savedUsername = localStorage.getItem(USERNAME_KEY);

if (!savedUsername) {
  // 저장된 이름이 없으면 로그인 폼 보여주기
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", handleLoginSubmit);
} else {
  // 저장된 이름이 있으면 바로 인사
  paintGreeting(savedUsername);
}

// 언어 변경 시 인사말만 다시 그려주는 전역 함수
window.updateGreetingLanguage = function () {
  const username = localStorage.getItem(USERNAME_KEY);
  if (!username) return;
  paintGreeting(username);
};
