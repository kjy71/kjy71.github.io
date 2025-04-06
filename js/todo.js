const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");
const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
function sexyFilter(event) {
  const li = event.target.parentElement;
  return toDos.id !== li.id;
}

function deleteToDo(event) {
  //const li = event.target.parentElement;
  const li = event.target.closest("li");
  li.remove();
  console.log(toDos);
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  console.log(toDos);
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.classList.add("delete-btn");
  button.innerHTML = `<span class="material-icons">close</span>`;

  //button.innerText = "❌"; //window + .
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const username = localStorage.getItem("username");
  if (!username) {
    alert("로그인 후 입력하세요!");
    return;
  }
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function sayHello() {
  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  //parsedToDos.forEach((item) => console.log("this is the turn of", item));
  parsedToDos.forEach(paintToDo);
}
