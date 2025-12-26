let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// QUESTIONS
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Wales", "Berlin"],
        answer: "Paris"
    },
    {
        question: "What is the capital of Nigeria?",
        options: ["Paris","Abuja", "Wales", "Berlin"],
        answer: "Abuja"
    },
    {
        question: "Who is Donald Trump?",
        options: ["China's Richest Man","Russian's President", "American's President", "Nigeria's President"],
        answer: "American's President"
    },
    {
        question: "Who is Joe Biden?",
        options: ["China's Poorest Man","Russian's Prime Minister", "American's Immediate Past President", "Nigeria's Senate President"],
        answer: "American's Immediate Past President"
    },
];


// LOADER (2 seconds)
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.querySelector('.content').style.display = 'block';
    }, 2000);
});


// DOM ELEMENTS
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-menu");
const quizContainer = document.getElementById("quiz-container");
const questionsDiv = document.getElementById("questions");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");
const resultsContainer = document.getElementById("results-container");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");


// START QUIZ
startBtn.addEventListener("click", () => {
     startScreen.style.display = "none";
     quizContainer.style.display = "block";
     startTimer();
     loadQuestion();
});


// LOAD QUESTION
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionsDiv.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    optionsDiv.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.type = "button"; // prevents page reload
        button.textContent = option;

        button.addEventListener("click", () => selectOption(option, button));
        optionsDiv.appendChild(button);

        if (userAnswers[currentQuestionIndex] === option) {
            button.style.backgroundColor = "lightgreen";
        }
    });

    prevBtn.disabled = currentQuestionIndex === 0;
}


// SELECT OPTION
function selectOption(option, button) {
    userAnswers[currentQuestionIndex] = option;

    Array.from(optionsDiv.children).forEach(btn => btn.style.backgroundColor = "");
    button.style.backgroundColor = "lightgreen";
}


// NEXT BUTTON
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});


// PREVIOUS BUTTON
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});


// SHOW RESULTS
function showResults() {
    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";

    score = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].answer) {
            score++;
        }
    });

    let percent = (score / questions.length) * 100;
    scoreDisplay.textContent = `${percent}%`;

    scoreDisplay.style.color = percent >= 70 ? "green" : "red";

    clearInterval(intervalId); // stop timer
}


// RESTART QUIZ
restartBtn.addEventListener("click", () => {
    resultsContainer.style.display = "none";
    startScreen.style.display = "block";

    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;

    totalSeconds = 60; 
    timerDisplay.textContent = "01:00";

    clearInterval(intervalId);
    intervalId = null;
});


// TIMER
let timerDisplay = document.getElementById('timer');
let intervalId = null;
let totalSeconds = 600; // 10 minutes


function updateTimerDisplay() {
    if (totalSeconds <= 0) {
        return;
    }

    totalSeconds--;

    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;

    timerDisplay.textContent = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}


function startTimer() {
    if (!intervalId) {
        intervalId = setInterval(updateTimerDisplay, 1000);
    }
}


// SUBMIT QUIZ (when timer ends)
function submitQuiz() {
    clearInterval(intervalId);
    intervalId = null;

    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";

    showResults();
}


// FOOTER YEAR
document.getElementById('year').textContent = new Date().getFullYear();
