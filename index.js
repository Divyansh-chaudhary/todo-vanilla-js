"use strict";
const toDoInput = document.querySelector(".to-do-input");
const toDoBtn = document.querySelector(".to-do-btn");
// const filter = document.querySelector("#filter");
const listItems = document.querySelector(".list-items");

const addLocal = (data) => {
  let todos;
  if (localStorage.getItem("tasks") === null) {
    todos = [data];
  } else {
    todos = JSON.parse(localStorage.getItem("tasks"));
    todos.push(data);
  }
  localStorage.setItem("tasks", JSON.stringify(todos));
};

const deleteLocal = (data) => {
  let todos = JSON.parse(localStorage.getItem("tasks"));
  todos.splice(todos.indexOf(data), 1);
  localStorage.setItem("tasks", JSON.stringify(todos));
};

const addToDo = (e) => {
  e.preventDefault();
  const data = toDoInput.value;
  if (data !== "") {
    let li = document.createElement("li");
    li.setAttribute("class", "to-do-item");
    let p = document.createElement("p");
    p.setAttribute("class", "to-do");
    p.innerText = data;
    let checkBox = document.createElement("i");
    checkBox.setAttribute("class", "fa fa-check");
    let trashBox = document.createElement("i");
    trashBox.setAttribute("class", "fa fa-trash");
    li.appendChild(p);
    li.appendChild(checkBox);
    li.appendChild(trashBox);
    listItems.appendChild(li);
    addLocal(data);
    toDoInput.value = "";
  } else {
    alert("enter task before adding");
  }
};

const completeTask = (data) => {
  let completeTodo = [];
  if (localStorage.getItem("complete-task") === null) {
    completeTodo = [data];
  } else {
    completeTodo = JSON.parse(localStorage.getItem("complete-task"));
    completeTodo.push(data);
  }
  localStorage.setItem("complete-task", JSON.stringify(completeTodo));
};

const notCompleteTask = (data) => {
  let inCompleteTasks = JSON.parse(localStorage.getItem("complete-task"));
  inCompleteTasks.splice(inCompleteTasks.indexOf(data), 1);
  localStorage.setItem("complete-task", JSON.stringify(inCompleteTasks));
};

const deleteOrCompleteToDo = (e) => {
  if (e.target.classList[1] === "fa-trash") {
    const deleteItem = e.target.parentNode;
    deleteLocal(deleteItem.children[0].innerText);
    deleteItem.classList.add("fall");
    deleteItem.addEventListener("transitionend", () => {
      deleteItem.remove();
    });
  } else if (e.target.classList[1] === "fa-check") {
    e.target.parentNode.classList.toggle("completed");
    if (e.target.parentNode.classList.contains("completed")) {
      completeTask(e.target.parentNode.children[0].innerText);
    } else {
      notCompleteTask(e.target.parentNode.children[0].innerText);
    }
  }
};

const getLocal = () => {
  if (localStorage.getItem("tasks") !== null) {
    const todos = JSON.parse(localStorage.getItem("tasks"));
    const completeTasks = JSON.parse(localStorage.getItem("complete-task"));
    todos.forEach((todo) => {
      let li = document.createElement("li");
      li.setAttribute("class", "to-do-item");
      if (completeTasks !== null) {
        if (completeTasks.includes(todo)) {
          li.classList.add("completed");
        }
      }
      let p = document.createElement("p");
      p.setAttribute("class", "to-do");
      p.innerText = todo;
      let checkBox = document.createElement("i");
      checkBox.setAttribute("class", "fa fa-check");
      let trashBox = document.createElement("i");
      trashBox.setAttribute("class", "fa fa-trash");
      li.appendChild(p);
      li.appendChild(checkBox);
      li.appendChild(trashBox);
      listItems.appendChild(li);
    });
  }
};

const filterTodo = (e) => {
  switch (e.target.value) {
    case "ALL":
      {
        const todos = document.querySelectorAll(".list-items li");
        todos.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      }
      break;
    case "COMPLETED": {
      const todos = document.querySelectorAll(".list-items li");
      todos.forEach((item) => {
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
      break;
    }
    case "INCOMPLETED": {
      const todos = document.querySelectorAll(".list-items li");
      todos.forEach((item) => {
        if (item.classList.contains("completed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
      });
      break;
    }
  }
};

toDoBtn.onclick = addToDo;
listItems.onclick = deleteOrCompleteToDo;
window.onload = getLocal;
filter.onchange = filterTodo;
