let anxiety = "";
let anxietyDegree = "";

function moveHome() {
    location.href = "index.html";
}

function moveSight() {
    location.href = "sight.html";
}

function moveFeel() {
    location.href = "feel.html";
}

function homeToFive() {
    anxiety = document.getElementById("anxiety").value;
    anxietyDegree = document.getElementById("anxiety-degree").value;

    console.log(anxiety);
    if(anxiety == "") {
        alert("入力してください");
        return;
    }

    moveSight();
}

function fiveToHome() {
    // document.getElementById("anxiety").textContent = anxiety;
    console.log(anxiety);
    moveHome();
}
