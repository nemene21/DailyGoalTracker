
let body = document.getElementsByTagName("body")[0];
let new_goal_button = document.getElementById("new_goal_button");

let daily_bar   = document.getElementById("daily_bar");
let alltime_bar = document.getElementById("alltime_bar");
let weekly_bar  = document.getElementById("weekly_bar");

let daily_score;
let percentages = [];

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

    daily_score = ratio;

    daily_bar.textContent = String(Math.floor(ratio * 100) + "%");

    let animation = daily_bar.animate([
        {backgroundColor: daily_bar.style.backgroundColor},
        {backgroundColor: color}
    ], {
        duration: 200,
        iterations: 1
    });

    animation.onfinish = function() {
        daily_bar.style.backgroundColor = color;
    }
}

function update_ui() {
    calculate_daily();

    save();
}

function save() {
    let goals_save = {};
    let goals = document.getElementsByClassName("goal");

    for (let i = 0; i < goals.length; i++) {
        let text = goals[i].textContent;
        goals_save[text] = goals[i].lastChild.checked;
    }

    let day = new Date().getDate();
    let last_day = window.localStorage.getItem("last_day");

    if (day != last_day) {
        percentages.push(daily_score);
    } else {
        percentages[percentages.length - 1] = daily_score
    }
    window.localStorage.setItem("last_day", day)
    window.localStorage.setItem("days", percentages.join(" "));

    window.localStorage.setItem("daily_goals", JSON.stringify(goals_save));
}

function load() {
    let goals_save = JSON.parse(window.localStorage.getItem("daily_goals"));
    let keys = Object.keys(goals_save);

    for (let i = 0; i < keys.length; i++) {
        make_goal(keys[i], goals_save[keys[i]]);
    }

    percentages = window.localStorage.getItem("days").split(" ");
    console.log(percentages);
}

function make_goal(text=undefined, done=false) {

    if (text == undefined) text = prompt("Write a goal:");
    if (text == "" || text == undefined) return;

    let goal = document.createElement("div");

    goal.textContent = text;
    goal.classList.add("goal");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() { update_ui() };
    checkbox.checked = done;

    goal.appendChild(checkbox);

    body.insertBefore(goal, new_goal_button);
}

// window.localStorage.clear()

load();
update_ui();