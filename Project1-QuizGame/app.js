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
    question: "What is the primary gas found in the Earth's atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: true },
            { text: "Carbon Dioxide", correct: false },
            { text: "Hydrogen", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Gd", correct: false },
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Pb", correct: false },
        ],
    },
    {
        question: "Which organ is responsible for pumping blood throughout the human body?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Heart", correct: true },
            { text: "Liver", correct: false },
            { text: "Brain", correct: false },
        ],
    },
    {
        question: "What is the speed of light in a vacuum approximately?",
        answers: [
            { text: "300,000 km/s", correct: true },
            { text: "150,000 km/s", correct: false },
            { text: "500,000 km/s", correct: false },
            { text: "1,000,000 km/s", correct: false },
        ],
    },
    {
        question: "Which element has the atomic number 1?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Oxygen", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Carbon", correct: false },
        ],
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Quartz", correct: false },
        ],
    },
    {
        question: "Which part of the plant conducts photosynthesis?",
        answers: [
            { text: "Root", correct: false },
            { text: "Stem", correct: false },
            { text: "Leaf", correct: true },
            { text: "Flower", correct: false },
        ],
    },
    {
        question: "Who proposed the theory of general relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false },
        ],
    },
    {
        question: "What is the boiling point of water at sea level?",
        answers: [
            { text: "90°C", correct: false },
            { text: "120°C", correct: false },
            { text: "100°C", correct: true },
            { text: "80°C", correct: false },
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


