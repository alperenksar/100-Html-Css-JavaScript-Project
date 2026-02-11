//DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-massage");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");



const quizQuestions = [
{
    question:"İloş ibne midir?",
    answers:[
        {text:"Evet" , correct:true},
        {text:"Kesinlikle Evet" , correct:true},
        {text:"Hayır" , correct:false},
        {text:"Alperen daha ibnedir" , correct:false},
    ],
},
{
    question:"İloş Alperen'i Türkiye'de özler mi?",
    answers:[
        {text:"Evet" , correct:false},
        {text:"Hayır" , correct:false},
        {text:"Sanmıyorum" , correct:false},
        {text:"ALPEREN ÖZLER" , correct:true},
    ],
},
{
    question:"Spark mı Alperen mi?",
    answers:[
        {text:"Spark" , correct:true},
        {text:"Alperen" , correct:false},
        {text:"Tabi ki Spark" , correct:true},
        {text:"Alperen şaka şaka Spark" , correct:true},
    ],
},


];


//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click" , startQuiz)
restartButton.addEventListener("click" , restartQuiz)


function startQuiz(){
    console.log("quiz started");
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function restartQuiz(){
    console.log("quiz restarted");
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}


function showQuestion(){
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click",selectAnswer);

        answerContainer.appendChild(button);
    });

}


function selectAnswer(event){
    
    if(answersDisabled) return;

    console.log("BAS");

    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else{
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();

        }
        else{
            showResults();
        }
    },1000)

}


function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent=score;
    const percantage = (score/quizQuestions.length)*100;

    if(percantage === 100){
        resultMessage.textContent = "Perfect ! You 're a genius!";
    }
    else if(percantage >= 80){
        resultMessage.textContent = "Great Job ! You know your stuff!";
    }
    else if(percantage >= 60){
        resultMessage.textContent = "Good effort ! Keep learning!";
    }
    else if(percantage >= 40){
        resultMessage.textContent = "Not bad ! Try again to improve!";
    }
    else{
        resultMessage.textContent = "Keep studying ! You 'll get better!";
    }


}


