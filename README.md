# 🌤 Momentum Style Vanilla JS App

바닐라 자바스크립트로 만든 간단한 모멘텀(Momentum) 스타일 크롬 앱입니다.  
[Nomad Coders - 바닐라 JS로 크롬 앱 만들기] 강의를 기반으로, 스타일과 코드 구조를 조금 더 다듬고 기능을 확장한 개인 학습/포트폴리오용 프로젝트입니다.

> 📝 Features: 실시간 시계, 로그인 & 인사말, 투두 리스트, 랜덤 배경, 명언 API, 날씨 API

---

## ✨ Demo

배포 후 링크를 여기에 추가하세요:

- GitHub Pages: `https://jaesung802.github.io/momentum-vanilla-js/`

---

## 🚀 Features

- **실시간 디지털 시계**
  - `setInterval`과 `Date` 객체를 사용한 00:00:00 형식의 실시간 시계
- **로그인 & 인사말**
  - 한 번 입력한 이름을 `localStorage`에 저장
  - 새로고침해도 이름을 기억하여 상단에 “안녕하세요, OOO님 👋” 출력
- **To Do 리스트**
  - 할 일 추가 / 삭제
  - 텍스트 클릭 시 완료/미완료 토글 (완료 시 줄긋기 효과)
  - 모든 데이터는 `localStorage`에 저장되어 새로고침해도 유지
- **랜덤 배경 이미지**
  - 새로고침 시 `img/` 폴더 내 이미지 중 하나를 랜덤으로 선택
  - 전체 화면 배경 + 글래스모피즘(반투명 카드) 스타일 적용
- **명언 (Quotes)**
  - 무료 API(Quotable)를 사용해 랜덤 명언 출력
  - API 오류 발생 시 기본 문구로 fallback 처리
- **날씨 (Weather)**
  - 브라우저 `geolocation`으로 현재 위치를 받아 OpenWeatherMap API로 날씨/온도 표시
  - API 키 미설정 / 에러 시에도 앱이 깨지지 않도록 예외 처리

---

## 🛠 Tech Stack

- **HTML5**
- **CSS3**
  - 글래스모피즘 스타일, 반응형 레이아웃
- **Vanilla JavaScript (ES6+)**
  - `fetch`, `async/await`
  - `localStorage`
  - `Geolocation API`

---

## 📁 Folder Structure

```text
.
├── index.html
├── css
│   └── style.css
├── js
│   ├── background.js
│   ├── clock.js
│   ├── greetings.js
│   ├── quotes.js
│   ├── todo.js
│   └── weather.js
└── img
    ├── 0.jpeg
    ├── 1.jpeg
    └── 2.jpeg
```
