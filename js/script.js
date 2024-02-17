const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const resultsElement = document.getElementById("results")

let shuffledQuestions, currentQuestionIndex
let answerSelected = false
let userResponses = []

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    correctAnswersCount = 0
    answerSelected = false
    userResponses = []
    questionContainerElement.classList.remove("hide")
    answerButtonsElement.classList.remove("hide")
    resultsElement.classList.add("hide")
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    if (currentQuestionIndex < questions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex])
    } else {
        showResults()
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach((answer) => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", (event) => selectAnswer(event, button))
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    answerSelected = false
}


function selectAnswer(event, selectedButton) {
    const correct = selectedButton.dataset.correct
    if (answerSelected)
    { return }
    answerSelected = true
    userResponses.push({
        question: shuffledQuestions[currentQuestionIndex].question,
        selectedAnswer: selectedButton.innerText,
        correctAnswer: correct ? selectedButton.innerText : getCorrectAnswerText(),
        isCorrect: correct ? "Correct" : "Incorrect"
    })
    if (correct) {
        correctAnswersCount++
    }
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        showResults()
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("btn-success")
    } else {
        element.classList.add("btn-danger")
    }
}

function clearStatusClass(element) {
    element.classList.remove("btn-success")
    element.classList.remove("btn-danger")
}

function showResults() {
    questionContainerElement.classList.add("hide")
    answerButtonsElement.classList.add("hide")
    questionElement.classList.add("hide")
    resultsElement.classList.remove("hide")

    let resultsHTML = `<h2>Your Score</h2>`
    userResponses.forEach((response) => {
        resultsHTML += `<p>${response.question}</p>
                        <p>Selected Answer: <span class="${response.isCorrect === 'Correct' ? 'text-bg-success' : 'text-bg-danger'}">${response.selectedAnswer}</span></p>
                        <p>Correct Answer: <span class="text-bg-success">${response.correctAnswer}</span></p>
                        <p class="${response.isCorrect === 'Correct' ? 'text-bg-success' : 'text-bg-danger'}">${response.isCorrect}</p>`
    })
    resultsElement.innerHTML = resultsHTML
}

function getCorrectAnswerText() {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answers.find(answer => answer.correct)
    return correctAnswer ? correctAnswer.text : ''
}

const questions = [
    {
        question: "When did the first human step on the moon?",
        answers: [
            { text: "1969", correct: true },
            { text: "1951", correct: false },
            { text: "1980", correct: false },
            { text: "1964", correct: false }
        ]
    },
    {
        question: "How many humans have gone to space?",
        answers: [
            { text: "270", correct: false },
            { text: "676", correct: true },
            { text: "841", correct: false },
            { text: "500", correct: false }
        ]
    },
    {
        question: "When did the Webb telescope launch",
        answers: [
            { text: "2018", correct: false },
            { text: "2022", correct: false },
            { text: "2021", correct: true },
            { text: "2024", correct: false }
        ]
    },
    {
        question: "How many space stations are in orbit?",
        answers: [
            { text: "1", correct: false },
            { text: "3", correct: false },
            { text: "0", correct: false },
            { text: "2", correct: true }
        ]
    },
]
