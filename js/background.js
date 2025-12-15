// ./js/background.js

// 무료 이미지 API (원하는 걸 골라 사용하세요)
// Picsum (랜덤 이미지)
const RANDOM_IMAGE_URL = "https://picsum.photos/1600/900";

// Unsplash Source (특정 키워드 랜덤 이미지 예시)
// const RANDOM_IMAGE_URL = "https://source.unsplash.com/1600x900/?nature,landscape";

function setBackgroundImage(url) {
  const bgImage = document.createElement("img");
  bgImage.src = url;
  bgImage.alt = "Background image";
  bgImage.classList.add("bg-image");

  // 기존과 동일하게 가장 뒤에 깔리도록 body 맨 앞에 추가
  document.body.prepend(bgImage);
}

// 실제 이미지 로드 후에만 DOM에 추가 (깜빡임 방지용)
function loadRandomBackground() {
  const img = new Image();
  img.onload = () => {
    setBackgroundImage(img.src);
  };
  img.onerror = (error) => {
    console.error("Failed to load background image:", error);
  };

  img.src = RANDOM_IMAGE_URL;
}

// 초기 실행
loadRandomBackground();
