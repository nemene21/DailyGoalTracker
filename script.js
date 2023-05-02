
let body = document.getElementsByTagName("body")[0];
let new_goal_button = document.getElementById("new_goal_button");

let daily_bar   = document.getElementById("daily_bar");
let alltime_bar = document.getElementById("alltime_bar");
let weekly_bar  = document.getElementById("weekly_bar");

function calculate_daily() {
    let score = 0;
    let goals = document.getElementsByClassName("goal");

    for (let i = 0; i < goals.lastChild.length; i++) {
        score += Number(goals[i].value);
    }

    daily_bar.textContent = String(Math.floor(score / goals.length * 100) + "%")
}

function update_ui() {
    calculate_daily();
}

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