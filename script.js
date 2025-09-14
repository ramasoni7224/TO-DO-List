const input = document.querySelector(".input input");
const addBtn = document.querySelector(".add-btn");
const tasksContainer = document.querySelector(".tasks");
const popup = document.getElementById("popup");

// 🎵 Sounds
const addSound = new Audio("sounds/add.mp3");
const removeSound = new Audio("sounds/remove.mp3");
const tickSound = new Audio("sounds/tick.mp3");

// Loader (page open animation)
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const container = document.querySelector(".container");

  loader.style.opacity = "1";
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    container.classList.remove("hidden");
    container.classList.add("show-container");
  }, 400);
});

// 🎵 Smooth sound play
function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

// 🚀 Instant popup (with smooth CSS)
function showPopup(message, color = "rgba(255, 76, 76, 0.9)") {
  popup.textContent = message;
  popup.style.background = color;
  popup.classList.remove("show");
  void popup.offsetWidth; // reflow trick
  popup.classList.add("show");

  setTimeout(() => popup.classList.remove("show"), 1200); // quick hide
}

// ➕ Add new task
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    showPopup("⚠ Please enter a task!");
    return;
  }

  const task = document.createElement("div");
  task.classList.add("task", "task-added");

  task.innerHTML = `
    <div>
      <input type="checkbox">
      <h4>${taskText}</h4>
    </div>
    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete">
  `;

  // ✅ Checkbox tick
  const checkbox = task.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    playSound(tickSound);
    if (checkbox.checked) {
      showPopup("🎉 Task Completed!", "rgba(52, 152, 219, 0.9)");
      task.querySelector("h4").style.textDecoration = "line-through";
    } else {
      showPopup("↩ Task Marked Incomplete!", "rgba(231, 76, 60, 0.9)");
      task.querySelector("h4").style.textDecoration = "none";
    }
  });

  // 🗑 Delete task
  const deleteBtn = task.querySelector("img");
  deleteBtn.addEventListener("click", () => {
    playSound(removeSound);
    showPopup("🗑 Task Removed!", "rgba(243, 156, 18, 0.9)");
    task.classList.add("task-remove");
    task.addEventListener("transitionend", () => task.remove());
  });

  // Append task
  tasksContainer.appendChild(task);
  input.value = "";

  // 🔊 Add sound + popup
  playSound(addSound);
  showPopup("✅ Task Added!", "rgba(39, 174, 96, 0.9)");
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
