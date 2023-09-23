const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const clickedCountElement = document.getElementById('clicked-count');
const unclickedCountElement = document.getElementById('unclicked-count');

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        // Display an alert message if the input is empty
        alert("You must write something!");
    } else {
        // Create a new list item
        let li = document.createElement("li");

        // Set the text of the list item to the input value
        li.textContent = inputBox.value;

        // Create a delete button
        let span = document.createElement("span");
        span.textContent = "\u00D7";

        // Add an event listener to the delete button to remove the task
        span.addEventListener('click', function () {
            li.remove();
            updateTaskCount(); // Update task count after removing a task
            saveData(); // Save the updated list after removing a task
        });

        // Append the delete button to the list item
        li.appendChild(span);

        // Append the list item to the list container
        listContainer.appendChild(li);

        updateTaskCount(); // Update task count after adding a task
        saveData(); // Save the updated list after adding a task
    }

    // Clear the input field
    inputBox.value = "";
}

// Function to toggle the task's status (checked/unchecked)
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        // Toggle the text-decoration
        if (e.target.classList.contains("checked")) {
            e.target.style.textDecoration = "line-through";
        } else {
            e.target.style.textDecoration = "none";
        }

        updateTaskCount(); // Update task count after toggling a task
        saveData(); // Save the updated list after toggling a task
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateTaskCount(); // Update task count after removing a task
        saveData(); // Save the updated list after removing a task
    }
}, false);

// Function to save the task list to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load and display tasks from local storage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateTaskCount(); // Update task count after loading tasks
}

// Function to update the task count display
function updateTaskCount() {
    const checkedTasks = document.querySelectorAll('.checked').length;
    const totalTasks = listContainer.children.length;
    const undoneTasks = totalTasks - checkedTasks;

    clickedCountElement.textContent = `Tasks Done: ${checkedTasks}`;
    unclickedCountElement.textContent = `Tasks Undone: ${undoneTasks}`;
}

// Load and display tasks when the page loads
showTask();

// Event listener for adding a new task
document.getElementById('add-button').addEventListener('click', addTask);

// Event listener for pressing Enter key to add a new task
inputBox.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
