// ./js/greetings.js (또는 greeting.js, HTML과 이름을 맞춰주세요)

const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input[type='text']");
const greetingElement = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function saveUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}

function paintGreeting(username) {
  // 영어 버전
  // greetingElement.textContent = `Hello, ${username} 👋`;

  // 한국어 버전이 더 좋다면:
  greetingElement.textContent = `안녕하세요, ${username}님 👋`;

  greetingElement.classList.remove(HIDDEN_CLASSNAME);
}

function handleLoginSubmit(event) {
  event.preventDefault();

  const username = loginInput.value.trim();
  if (!username) {
    // 혹시 공백만 입력하는 경우를 방지
    return;
  }

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
