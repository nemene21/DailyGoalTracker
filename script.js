
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
    let ratio;

    if (goals.length == 0) {
        score = 0;
        daily_score = 0;
        ratio = 0;

    } else {

        for (let i = 0; i < goals.length; i++) {
            if (goals[i].lastChild.checked) score++;
        }

        ratio = score / goals.length;
        daily_score = ratio;
    }

    let color = "rgb(" + String(94 * ratio) + " " + String(lerp(69, 195, ratio)) + " " + String(lerp(171, 100, ratio)) + ")";

    daily_bar.textContent = String(Math.floor(ratio * 100) + "% - Daily");

    let daily_animation = daily_bar.animate([
        {backgroundColor: daily_bar.style.backgroundColor},
        {backgroundColor: color}
    ], {
        duration: 200,
        iterations: 1
    });

    daily_animation.onfinish = function() {
        daily_bar.style.backgroundColor = color;
    }
}

function calculate_alltime() {
    let score = 0;
    for (let i = 0; i < percentages.length; i++) {
        score += Number(percentages[i]);
    }
    score /= percentages.length;

    alltime_bar.textContent = String(Math.floor(score * 100) + "% - All time");

    let color = "rgb(" + String(94 * score) + " " + String(lerp(69, 195, score)) + " " + String(lerp(171, 100, score)) + ")";

    let alltime_animation = alltime_bar.animate([
        {backgroundColor: alltime_bar.style.backgroundColor},
        {backgroundColor: color}
    ], {
        duration: 200,
        iterations: 1
    });

    alltime_animation.onfinish = function() {
        alltime_bar.style.backgroundColor = color;
    }
}

function calculate_weekly() {
    let score = 0;
    let depth = Math.min(7, percentages.length);

    for (let i = 0; i < depth; i++) {
        score += Number(percentages[percentages.length - i - 1]);
    }
    score /= depth;

    weekly_bar.textContent = String(Math.floor(score * 100) + "% - Weekly");

    let color = "rgb(" + String(94 * score) + " " + String(lerp(69, 195, score)) + " " + String(lerp(171, 100, score)) + ")";

    let alltime_animation = weekly_bar.animate([
        {backgroundColor: weekly_bar.style.backgroundColor},
        {backgroundColor: color}
    ], {
        duration: 200,
        iterations: 1
    });

    alltime_animation.onfinish = function() {
        weekly_bar.style.backgroundColor = color;
    }
}

function update_ui() {
    calculate_daily();
    save();
    console.log(percentages)
    calculate_alltime();
    calculate_weekly();
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
}

function make_goal(text=undefined, done=false) {

    if (text == undefined) text = prompt("Write a goal:");
    if (text == "" || text == undefined) return;

    let goal = document.createElement("div");
    goal.classList.add("goal");

    let delete_button = document.createElement("img");
    delete_button.classList.add("delete_button");
    delete_button.src = "assets/delete.svg";
    delete_button.onclick = function() {
        goal.remove();
        console.log("when the");
        update_ui();
    }
    goal.appendChild(delete_button);

    let inside_text = document.createElement("span");
    inside_text.textContent = text;
    goal.appendChild(inside_text);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function() { update_ui() };
    checkbox.checked = done;
    goal.appendChild(checkbox);

    body.insertBefore(goal, new_goal_button);
}

// window.localStorage.clear()

if (window.localStorage.getItem("last_day") != undefined)
    load();

else {
    percentages = []
}

update_ui();