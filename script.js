
let body = document.getElementsByTagName("body")[0];
let new_goal_button = document.getElementById("new_goal_button");

let daily_bar   = document.getElementById("daily_bar");
let alltime_bar = document.getElementById("alltime_bar");
let weekly_bar  = document.getElementById("weekly_bar");

function lerp(a, b, c) {
    return a + (b - a) * c
}

function calculate_daily() {
    let score = 0;
    let goals = document.getElementsByClassName("goal");

    if (goals.length == 0) { return };

    for (let i = 0; i < goals.length; i++) {
        if (goals[i].lastChild.checked) score++;
    }

    let ratio = score / goals.length;
    color = "rgb(" + String(94 * ratio) + " " + String(lerp(69, 195, ratio)) + " " + String(lerp(171, 100, ratio)) + ")";

    daily_bar.textContent = String(Math.floor(ratio * 100) + "%");

    let animation = daily_bar.animate([
        {backgroundColor: daily_bar.style.backgroundColor},
        {backgroundColor: color}
    ], {
        duration: 500,
        iterations: 1
    });

    animation.onfinish = function() {
        daily_bar.style.backgroundColor = color;
    }
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
    checkbox.onclick = function() { update_ui() };

    goal.appendChild(checkbox);

    body.insertBefore(goal, new_goal_button);

    update_ui();
}

update_ui();