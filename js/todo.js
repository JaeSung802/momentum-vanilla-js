// ./js/todo.js

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// [{ id: number, text: string, completed: boolean }]
let toDos = [];

/**
 * 로컬스토리지에 현재 toDos 배열 저장
 */
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

/**
 * li 하나를 만들어주는 함수
 */
function createToDoElement(todo) {
  const li = document.createElement("li");
  li.dataset.id = String(todo.id); // data-id 로 저장

  if (todo.completed) {
    li.classList.add("is-completed");
  }

  const span = document.createElement("span");
  span.textContent = todo.text;
  span.addEventListener("click", handleToggleCompleted); // 텍스트 클릭 시 완료 토글

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "❌";
  button.setAttribute("aria-label", "Delete todo");
  button.addEventListener("click", handleDeleteToDo);

  li.append(span, button);
  return li;
}

/**
 * 투두 삭제
 */
function handleDeleteToDo(event) {
  const li = event.currentTarget.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);
  // 화면에서 제거
  li.remove();
  // 배열에서도 제거
  toDos = toDos.filter((todo) => todo.id !== id);
  saveToDos();
}

/**
 * 완료 상태 토글
 */
function handleToggleCompleted(event) {
  const li = event.currentTarget.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  // 데이터 업데이트
  toDos = toDos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  // 화면 업데이트
  li.classList.toggle("is-completed");
  saveToDos();
}

/**
 * 화면에 투두 하나 그리기
 */
function paintToDo(todo) {
  const li = createToDoElement(todo);
  toDoList.appendChild(li);
}

/**
 * 폼 전송(투두 추가)
 */
function handleToDoSubmit(event) {
  event.preventDefault();

  const text = toDoInput.value.trim();
  if (!text) {
    // 공백만 입력하면 추가하지 않음
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  toDos.push(newTodo);
  paintToDo(newTodo);
  saveToDos();

  toDoInput.value = "";
}

/**
 * 저장된 투두 로드
 * (예전 구조 {id, text} 만 있던 데이터도 호환되도록 처리)
 */
function loadToDos() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  if (!savedToDos) return;

  try {
    const parsed = JSON.parse(savedToDos);

    if (!Array.isArray(parsed)) return;

    toDos = parsed.map((item) => ({
      id: item.id,
      text: item.text,
      completed: Boolean(item.completed), // 이전 데이터엔 없을 수 있으니 기본 false
    }));

    toDos.forEach(paintToDo);
  } catch (error) {
    console.error("Failed to load todos:", error);
    toDos = [];
  }
}

// 초기 실행
toDoForm.addEventListener("submit", handleToDoSubmit);
loadToDos();
