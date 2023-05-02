
let body = document.getElementsByTagName("body")[0];
let new_goal_button = document.getElementById("new_goal_button");


function make_goal() {
    let text = prompt("Write a goal:");
    if (text == "" || text == undefined) return

    let goal = document.createElement("div");

    goal.textContent = text;
    goal.classList.add("goal");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    goal.appendChild(checkbox);

    body.insertBefore(goal, new_goal_button);
}