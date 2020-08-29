var clearButton = document.querySelector("#reset");
var ifEmpty = document.querySelector("#empty")
var display = document.querySelector(".display-score")

var displayHistory = function(){
    var memory = localStorage.getItem("scoreList");
    if (memory){
        var scoreList = JSON.parse(memory);
        for (var i=0; i<scoreList.length;i++){
            preScore = document.createElement("li");
            preScore.textContent = i+1 + ". " + scoreList[i].init + " - " + scoreList[i].score;
            display.appendChild(preScore);
        }
    } else {
        ifEmpty.classList.remove("hide");
        display.classList.add("hide");
    }
}
var clearHistory = function (){
    localStorage.setItem("scoreList","");
    displayHistory();
}

clearButton.addEventListener("click",clearHistory);

displayHistory();