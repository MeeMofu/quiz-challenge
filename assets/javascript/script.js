var startButton = document.querySelector("#start-btn");
var info = document.querySelector("#info");
var userIput =document.querySelector("#quiz-input")

startButton.addEventListener("click",function(event){
    info.classList.add("hide");
    startButton.classList.add("hide");
    userIput.classList.remove("hide");
})

userIput.addEventListener("click",function(event){
    var option = event.target.closest(".option-wrapper");
    if (option){
        console.log(option.querySelector(".option").getAttribute("data-choice-id"));
    }
})