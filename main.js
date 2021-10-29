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


let deepBreathCount = 15;
let interval;
function countdown() {
    deepBreathCount--;
    document.getElementById("timer").textContent = deepBreathCount;
    if(deepBreathCount <= 0) {
        clearInterval(interval);
        document.getElementById("deep-breath").disabled = false;
        document.getElementById("exhale").style.color = "whitesmoke";
        document.getElementById("exhale").style.fontWeight = "normal";
        deepBreathCount = 15;
    } else if(deepBreathCount === 10) {
        document.getElementById("inhale").style.color = "whitesmoke";
        document.getElementById("inhale").style.fontWeight = "normal";
        document.getElementById("stop").style.color = "crimson";
        document.getElementById("stop").style.fontWeight = "bold";
    } else if (deepBreathCount === 5) {
        document.getElementById("stop").style.color = "whitesmoke";
        document.getElementById("stop").style.fontWeight = "normal";
        document.getElementById("exhale").style.color = "crimson";
        document.getElementById("exhale").style.fontWeight = "bold";
    }
}

function startCountdown() {
    document.getElementById("deep-breath").disabled = true;

    document.getElementById("timer").textContent = deepBreathCount;
    document.getElementById("inhale").style.color = "crimson";
    document.getElementById("inhale").style.fontWeight = "bold";
    interval = setInterval(countdown, 1100);
}

function complete() {
    move("complete");
}


document.getElementById("twitter-share-button").onclick = function() {
    let anxiety = localStorage.getItem("anxiety");
    let anxietyDegreeBefore = localStorage.getItem("anxietyDegree");
    let anxietyDegreeAfter  = document.getElementById("anxiety-degree").value;
    let text = `不安の内容「${anxiety}」が「${anxietyDegreeBefore}」から「${anxietyDegreeAfter}」に変わりました。`;

    // オプションパラメータを設定
    let hashtags = "ImHereNow";
    let url = encodeURIComponent(document.domain)

    // URLを生成して遷移
    window.open("https://twitter.com/share?text=" + text + "&hashtags=" + hashtags + "&url=" + url);
}
