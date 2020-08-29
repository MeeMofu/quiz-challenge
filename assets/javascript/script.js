var startButton = document.querySelector("#start-btn");
var questionPrompt = document.querySelector(".prompt");
var info = document.querySelector("#info");
var userInput = document.querySelector("#quiz-input");
var correctAns = document.querySelector("#correct");
var wrongAns = document.querySelector("#incorrect");
var timer = document.querySelector(".timer");

// Question listing
var question = [
    { q: '<var> data does not include', op0: 'boolean', op1: 'alert', op2: 'number', op3: 'string', ans: '1'},
    { q: 'Inside which HTML element do we put JavaScript?', op0: '<js>', op1: '<scipt>', op2: '<scripting>', op3: '<javascipt>', ans: '1'}
];

var isQuesUpd = false; //For checking when the question needs to be update

var timeLeft=5;
var score=0;

var updateQuestion = function(index){
    // index here is uses for which question the quiz is on
    questionPrompt.textContent = question[index].q;
    document.querySelector("[data-choice-id='0']").textContent = question[index].op0;
    document.querySelector("[data-choice-id='1']").textContent = question[index].op1;
    document.querySelector("[data-choice-id='2']").textContent = question[index].op2;
    document.querySelector("[data-choice-id='3']").textContent = question[index].op3;
}


var endGame = function () {
    userInput.classList.add("hide");
    questionPrompt.textContent = "All done!";
    // shows score + input form
    // save input
}

var timeInterval
var clockStart = function(){
    timeInterval = setInterval(function(){
        if (timeLeft>0){
            timeLeft--;
            timer.textContent = timeLeft;
        } else {
            clearInterval(timeInterval);
            endGame();
        }
    },1000);
}

var readUserInput = function(event){
    var isPannelClicked = event.target.closest(".option-wrapper");
    if (isPannelClicked){
        var input = isPannelClicked.querySelector(".option").getAttribute("data-choice-id");
        clearInterval(timeInterval);
        console.log(input);
        // Check answers
    }
}

var startQuiz = function(event){
    // hide the info and button
    info.classList.add("hide");
    startButton.classList.add("hide");
    userInput.classList.remove("hide");
    // Set the prompt to left align
    questionPrompt.style.textAlign = "left";
    quesNum=0; 
    // Start timer
    timer.textContent = timeLeft;
    clockStart();
    // Start loop
    updateQuestion(quesNum);
}

userInput.addEventListener("click",readUserInput);
 


startButton.addEventListener("click",startQuiz);
