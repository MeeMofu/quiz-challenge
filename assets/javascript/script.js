var startButton = document.querySelector("#start-btn");
var questionPrompt = document.querySelector(".prompt");
var info = document.querySelector("#info");
var userIput = document.querySelector("#quiz-input");
var correctAns = document.querySelector("#correct");
var wrongAns = document.querySelector("#incorrect");
var timer = document.querySelector(".timer");

// Question listing
var question = [
    { q: '<var> data does not include', op0: 'boolean', op1: 'alert', op2: 'number', op3: 'string', ans: '1'},
    { q: 'Inside which HTML element do we put JavaScript?', op0: '<js>', op1: '<scipt>', op2: '<scripting>', op3: '<javascipt>', ans: '1'}
];
// Time limit
var timeLeft=75;

var updateQuestion = function(index){
    // index here is uses for which question the quiz is on
    questionPrompt.textContent = question[index].q;
    document.querySelector("[data-choice-id='0']").textContent = question[index].op0;
    document.querySelector("[data-choice-id='1']").textContent = question[index].op1;
    document.querySelector("[data-choice-id='2']").textContent = question[index].op2;
    document.querySelector("[data-choice-id='3']").textContent = question[index].op3;
}

var clockStart = function(){
    var timeInterval = setInterval(function(){
        if (timeLeft>0){
            timeLeft--;
            timer.textContent = timeLeft;
        } else {
            clearInterval(timeInterval);
            // Ends game, open highscore

        }
    },1000);
}

var startQuiz = function(event){
    // hide the info and button
    info.classList.add("hide");
    startButton.classList.add("hide");
    userIput.classList.remove("hide");
    // Set the prompt to left align
    questionPrompt.style.textAlign = "left";
    quesNum=0;
    // update question
    updateQuestion(quesNum);
    // Start timer
    timer.textContent = timeLeft;
    clockStart();
    // Start loop
    
}

startButton.addEventListener("click",startQuiz);

userIput.addEventListener("click",function(event){
    var option = event.target.closest(".option-wrapper");
    if (option){
        console.log(option.querySelector(".option").getAttribute("data-choice-id"));
    }
})