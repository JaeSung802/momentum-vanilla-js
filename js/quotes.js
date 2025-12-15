// ./js/quotes.js

const quoteTextElement = document.querySelector("#quote span:first-child");
const quoteAuthorElement = document.querySelector("#quote span:last-child");

// Quotable API에서 랜덤 명언 1개 가져오기
async function fetchRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/quotes/random");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // /quotes/random 의 응답 형태는 [ { content, author, ... } ] 배열
    const data = await response.json();
    const randomQuote = data[0];

    const { content, author } = randomQuote;

    renderQuote(content, author);
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    renderFallbackQuote();
  }
}

// 명언/저자 화면에 출력
function renderQuote(content, author) {
  if (!quoteTextElement || !quoteAuthorElement) return;

  quoteTextElement.textContent = content;
  quoteAuthorElement.textContent = `- ${author}`;
}

// API가 실패했을 때 사용할 기본 문구 (배열 X, 단일 값만 사용)
function renderFallbackQuote() {
  const fallbackContent = "Stay hungry, stay foolish.";
  const fallbackAuthor = "Steve Jobs";

  renderQuote(fallbackContent, fallbackAuthor);
}

// 페이지 로드 시 바로 실행
fetchRandomQuote();
