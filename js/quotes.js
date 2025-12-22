// ./js/quotes.js

const quoteTextElement = document.querySelector("#quote span:first-child");
const quoteAuthorElement = document.querySelector("#quote span:last-child");

// 새 랜덤 명언 API (Quotable 대체)
// 참고: https://motivational-spark-api.vercel.app/api/
const QUOTE_API_URL =
  "https://motivational-spark-api.vercel.app/api/quotes/random";

// API에서 랜덤 명언 가져오기
async function fetchRandomQuote() {
  if (!quoteTextElement || !quoteAuthorElement) return;

  try {
    const response = await fetch(QUOTE_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답 예시: { "author": "Anonymous", "quote": "..." }
    const data = await response.json();

    const content = data.quote || "Stay hungry, stay foolish.";
    const author = data.author || "Unknown";

    renderQuote(content, author);
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    renderFallbackQuote();
  }
}

// 화면에 명언/저자 표시
function renderQuote(content, author) {
  quoteTextElement.textContent = content;
  quoteAuthorElement.textContent = `- ${author}`;
}

// API 실패 시 기본 문구
function renderFallbackQuote() {
  const fallbackContent = "Stay hungry, stay foolish.";
  const fallbackAuthor = "Steve Jobs";

  renderQuote(fallbackContent, fallbackAuthor);
}

// 페이지 로드 시 실행
fetchRandomQuote();
