const API_URL = "https://69e8b78455d62f347979b77f.mockapi.io/tasks";

// load tasks
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
    li.textContent = task.title;

    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "ml-2 text-red-500 hover:text-red-700";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// add task
async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value;

  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  input.value = "";
  loadTasks();
}

// delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// Initial load
loadTasks();