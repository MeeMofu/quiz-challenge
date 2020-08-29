var startButton = document.querySelector("#start-btn");
var questionPrompt = document.querySelector(".prompt");
var info = document.querySelector("#info");
var userInput = document.querySelector("#quiz-input");
var correctAns = document.querySelector("#correct");
var wrongAns = document.querySelector("#incorrect");
var timer = document.querySelector(".timer");
var userscore = document.querySelector("#score-form");

// Question listing
var question = [
    { q: '<var> data does not include', op0: 'boolean', op1: 'alert', op2: 'number', op3: 'string', ans: '1'},
    { q: '<var> data does not include', op0: 'boolean', op1: 'alert', op2: 'number', op3: 'string', ans: '1'},
    { q: 'Inside which HTML element do we put JavaScript?', op0: '<js>', op1: '<scipt>', op2: '<scripting>', op3: '<javascipt>', ans: '1'}
];
var quesNum=0; //Keeping track of question
var timeLeft=30;

var fadeTimer;
var fadeOutCorrect = function(){
    correctAns.style.opacity = '0';
}
var fadeOutIncorrect = function(){
    wrongAns.style.opacity = '0';
}
var clearResult = function(){
    clearTimeout(fadeTimer); 
    correctAns.classList.add("hide");
    correctAns.style.opacity = '1';
    wrongAns.classList.add("hide");
    wrongAns.style.opacity = '1';
}

var displayResult = function (result){
    clearResult();
    if (result){
        correctAns.classList.remove("hide");
        fadeTimer = setTimeout(fadeOutCorrect,1000);
    } else {
        wrongAns.classList.remove("hide");
        fadeTimer = setTimeout(fadeOutIncorrect,1000);

    }
    
}

var updateQuestion = function(index){
    // index here is uses for which question the quiz is on, uses index instead of quesNum for randomizing questions
    questionPrompt.textContent = question[index].q;
    document.querySelector("[data-choice-id='0']").textContent = question[index].op0;
    document.querySelector("[data-choice-id='1']").textContent = question[index].op1;
    document.querySelector("[data-choice-id='2']").textContent = question[index].op2;
    document.querySelector("[data-choice-id='3']").textContent = question[index].op3;
}

var endGame = function () {
    userInput.classList.add("hide");
    questionPrompt.textContent = "All done!";
    questionPrompt.style.textAlign = "center";
    // shows score + input form
    userscore.classList.remove("hide");
    userscore.querySelector("#score").textContent="Your score is "+Math.max(timeLeft,0);
}
var timerInterval

var nextQuestion = function(input){
    var result = (input === question[quesNum].ans);
    if (!result){
        timeLeft-=10;
        timer.textContent = Math.max(timeLeft,0);
    }
    displayResult(result);
    if (quesNum<2){
        quesNum++;
        updateQuestion(quesNum);
    } else {
        clearInterval(timerInterval);
        endGame();
    }
}

var clockStart = function(){
    timerInterval = setInterval(function(){
        if (timeLeft>0){
            timeLeft--;
            timer.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    },1000);
}

var readUserInput = function(event){
    var isPannelClicked = event.target.closest(".option-wrapper");
    if (isPannelClicked){
        var input = isPannelClicked.querySelector(".option").getAttribute("data-choice-id");
        // Check answers
        nextQuestion(input);
    }
}

var startQuiz = function(event){
    // hide the info and button
    info.classList.add("hide");
    startButton.classList.add("hide");
    userInput.classList.remove("hide");
    // Set the prompt to left align
    questionPrompt.style.textAlign = "left";
    // Start timer
    timer.textContent = timeLeft;
    clockStart();
    // Start loop
    updateQuestion(quesNum);
}

userInput.addEventListener("click",readUserInput);
 
startButton.addEventListener("click",startQuiz);

var saveInfo=function(userinit,userscore){
    var newInfo = {init: userinit, score: userscore};
    // Get previous scores
    var memory = localStorage.getItem("scoreList");
    console.log(memory);
    if ((memory == null)||(memory==="")){
        //checks if null
        var scoreList = []; //array of object
        scoreList.push(newInfo); 
    } else {
        var scoreList = JSON.parse(memory);
        if (scoreList[scoreList.length-1].score>userscore){
            // check if latest score is lowest
            scoreList.push(newInfo); 
        } else {
            // if not lowest, find previous score that is lower than the current one
            var i=0;
            while (userscore<scoreList[i].score){
                i++;
            }
            scoreList.splice(i,0,newInfo);
        }
    }
    localStorage.setItem("scoreList",JSON.stringify(scoreList));
}

var saveScore = function(event){
    event.preventDefault();
    var userInit = document.querySelector("input[name='username']").value;
    userscore.reset();
    if (userInit === ""){
        alert("Please enter your initials")
    } else {
        saveInfo(userInit,timeLeft);
        open("./highscore.html","_self");
    }
}

userscore.addEventListener("submit",saveScore);