function move(page) {
    location.href = `${page}.html`;
}

// saveInput("sight", 5)
function saveInput(prefix, length) {
    console.log("Save input");
    let textList = [];
    for(let i = 0; i < length; i++) {
        let text = document.getElementById(`${prefix}-text${i+1}`).value;
        console.log(text);
        if(!text) text = "";
        textList.push(text);
    }
    localStorage.setItem(`${prefix}Text`, JSON.stringify(textList));
}

function loadInput(prefix, length) {
    console.log("Load input");
    let item = localStorage.getItem(`${prefix}Text`);
    if(!item) {
        console.log("Input doesn't exist");
        return;
    }

    let textList = JSON.parse(item);
    console.assert(textList.length === length);
    for(let i = 0; i < length; i++) {
        document.getElementById(`${prefix}-text${i+1}`).value = textList[i];
        console.log(textList[i]);
    }
}

function checkInput(prefix, length) {
    console.log("Check input");
    for(let i = 0; i < length; i++) {
        let text = document.getElementById(`${prefix}-text${i+1}`).value;
        console.log(text);
        if(!text) {
            alert("未入力の項目があります");
            return false;
        }
    }
    return true;
}

function homeToFive() {
    let anxiety = document.getElementById("anxiety").value;
    let anxietyDegree = document.getElementById("anxiety-degree").value;

    if(!anxiety || !anxietyDegree) {
        alert("不安の内容を入力してください");
        return;
    }

    localStorage.setItem("anxiety", anxiety);
    localStorage.setItem("anxietyDegree", anxietyDegree);

    move("sight");
}

function previous(prefix, length, to) {
    saveInput(prefix, length);
    move(to);
}

function next(prefix, length, to) {
    if(checkInput(prefix, length)) {
        saveInput(prefix, length);
        move(to);
    }
}
