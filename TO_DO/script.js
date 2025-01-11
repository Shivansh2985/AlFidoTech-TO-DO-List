const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask(){
    if(inputBox.value === ''){
        alert("You Must Write Something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);
function showAll() {
    let tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => task.style.display = 'block');
}

function showChecked() {
    let tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        if (task.classList.contains('checked')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function showUnchecked() {
    let tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        if (!task.classList.contains('checked')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

