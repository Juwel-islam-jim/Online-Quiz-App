const questions = [
    {
        question: "Stonehenge is located in which country ? ",
        answers: [
            {text: "England", correct: true},
            {text: "Finland", correct: false},
            {text: "Brazil", correct: false},
            {text: "Spain", correct: false},
        ]
    },
    {
        question: "Which city is known as  the 'City of Love!' ? ",
        answers: [
            {text: "Paris", correct: true},
            {text: "Mumbai", correct: false},
            {text: "Puerto-rico", correct: false},
            {text: "Los-Angeles", correct: false},
        ]
    },
    {
        question: "Which is the world`s driest place ? ",
        answers: [
            {text: "Sahara Desert", correct: false},
            {text: "The Atacama Desert in Chile", correct: true},
            {text: "Vatican City ", correct: false},
            {text: "Pyramid road of Egypt", correct: false},
        ]
    },
    {
        question: "Which is the oldest existing university in the world in continuous operation ? ",
        answers: [
            {text: "University of California", correct: false},
            {text: "University of Melberne City", correct: false},
            {text: "University of Oxford", correct: false},
            {text: " University of Bologna(Italy)", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();





