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
    { q: 'What is the correct syntax for referring to an external script called "xxx.js"?', op0: '<script src=\"xxx.js\">', op1: '<script name=\"xxx.js\">', op2: '<script href=\"xxx.js\">', op3: '<script url=\"xx.js\">', ans: '0'},
    { q: 'What does <var> data does not include?', op0: 'boolean', op1: 'alert', op2: 'number', op3: 'string', ans: '1'},
    { q: 'How do you write "Hello World" in an alert box?', op0: 'msg(\"Hello World\");', op1: 'msgBox(\"Hello World\");', op2: 'alert(\"Hello World\");', op3: 'alertBox(\"Hello World\");', ans: '2'},
    { q: 'What character encloses string values ?', op0: 'commas', op1: 'curly brackets', op2: 'parenthesis', op3: 'quotes', ans: '3'},
    { q: 'What is the correct format for if statement?', op0: 'if i = 5', op1: 'if i == 5 then', op2: 'if (i === 5)', op3: 'if (i = 5)', ans: '2'},
    { q: 'Inside which HTML element do we put JavaScript?', op0: '<js>', op1: '<script>', op2: '<scripting>', op3: '<javascript>', ans: '1'}
];
var quesNum=0; //Keeping track of question
var timeLeft=75;

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
    questionPrompt.style.textAlign = "center";
    // shows score + input form
    userscore.classList.remove("hide");
    userscore.querySelector("#score").textContent="Your score is "+Math.max(timeLeft,0);
}
var timerInterval

var select;
var nextQuestion = function(input){
    var result = (input === question[select].ans);
    if (!result){
        timeLeft-=10;
        timer.textContent = Math.max(timeLeft,0);
    }
    displayResult(result);
    question.splice(select,1);
    if (quesNum<4){
        // pick random question
        select = Math.floor(Math.random()*question.length);
        updateQuestion(select);
        // clear selected question
        quesNum++;
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

var firstQuestion = function(){
    select = Math.floor(Math.random()*question.length);
    updateQuestion(select);
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
    // Load
    firstQuestion();
}

userInput.addEventListener("click",readUserInput);
 
startButton.addEventListener("click",startQuiz);

var saveInfo=function(userinit,userscore){
    var newInfo = {init: userinit, score: userscore};
    // Get previous scores
    var memory = localStorage.getItem("scoreList");
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