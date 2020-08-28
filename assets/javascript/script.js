var startButton = document.querySelector("#start-btn");
var info = document.querySelector("#info");
startButton.addEventListener("click",function(event){
    info.classList.add("hide");
    startButton.classList.add("hide");
})