let todos = [];

storedTodos = localStorage.getItem('todos');

todos = storedTodos ? storedTodos.split(',') : [];

console.log(todos)


let editIndex = null;

// function for adding todos
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    // Prevent default behavior (form submission)
    event.preventDefault();
    // Trigger button click event
    addTodos();
  }
}

function addTodos() {
  let todoItem = document.querySelector('.inputValue')
  let inputText = todoItem.value.trim();

  if (inputText !== '') {
    if (editIndex !== null) {
      todos[editIndex] = inputText;
      editIndex = null;
    }
    else {
      todos.push(inputText);
    }

    saveTodosTolocalStorage(); // call function to save todos
    todoItem.value = "";
    displayTodos();
  }
  else {
    alert("please enter a todo");
  }

}


// Function for deleting todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodosTolocalStorage();
  displayTodos();
}

// Function for saving todos to local storage
function saveTodosTolocalStorage() {
  localStorage.setItem('todos', todos);
}



//Function to edit todo
function editTodo(index) {
  let todoItem = document.querySelector('.inputValue');
  todoItem.value = todos[index];
  editIndex = index;
}

// function to displaying todos
function displayTodos() {
  let todoList = document.querySelector('.todoList');
  todoList.innerHTML = '';

  if (todos.length > 0) {
    let ul = document.createElement('ul');

    todos.forEach((todo, index) => {
      let li = document.createElement('li');


      li.textContent = ` ${todo}`; // Todo Content
      ul.appendChild(li);

      let markBtn = document.createElement('span');
      markBtn.classList.add('markBtn');
      markBtn.innerHTML = `<i class="fa-regular fa-circle"></i>`;

      function toggleMark() {
        let currentIcon = markBtn.querySelector('i').classList.contains('fa-circle-check') ? 'checked' : 'unchecked';
        if (currentIcon === 'checked') {
          markBtn.innerHTML = `<i class="fa-regular fa-circle"></i>`;
          li.style.color = "black";

        } else {
          markBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
          li.style.color = "gray";
        }
      }

      markBtn.addEventListener('click', toggleMark);

      li.prepend(markBtn);

      let deleteButton = document.createElement('button');
      deleteButton.classList.add('deleteTodo');
      deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`
      li.prepend(deleteButton);
      deleteButton.onclick = () => deleteTodo(index);

      let editBtn = document.createElement('button');
      editBtn.classList.add("editBtn");
      editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      li.append(editBtn);
      editBtn.onclick = () => editTodo(index);
    });
    todoList.appendChild(ul);
  }
  else {
    todoList.innerHTML = `No Todos`;
  }
}

displayTodos();