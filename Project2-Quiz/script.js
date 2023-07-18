"use strict"
// Define your quiz questions and options here
const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is 5 + 3?",
      options: ["8", "9", "10", "7"],
      answer: "8",
    },
    {
        question: "What is 5 + 3?",
        options: ["8", "9", "10", "7"],
        answer: "8",
    },
    {
        question: "What is 5 + 3?",
        options: ["8", "9", "10", "7"],
        answer: "8",
    },
    {
        question: "What is 5 + 3?",
        options: ["8", "9", "10", "7"],
        answer: "8",
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  // Function to display the current question and options
function showQuestion() {
    const questionContainer = document.querySelector(".question");
    const optionsContainer = document.querySelector(".options");
  
    // Check if the currentQuestion is within the valid range
    if (currentQuestion < questions.length) {
      questionContainer.textContent = questions[currentQuestion].question;
      optionsContainer.innerHTML = "";
  
      for (let option of questions[currentQuestion].options) {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option", "button-style");
  
        // Add event listener to check the answer
        button.addEventListener("click", checkAnswer);
        optionsContainer.appendChild(button);
      }
    } else {
      // If the quiz is completed, show the results
      showResults();
    }
  }
  
  // Function to check the selected answer
  function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = questions[currentQuestion].answer;
  
    if (selectedAnswer === correctAnswer) {
      score++;
    }
  
    currentQuestion++;
  
    // Check if the quiz is completed
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }
  
  // Function to display the quiz results and save the score
  function showResults() {
    const quizTile = document.querySelector(".quiztile");
    quizTile.innerHTML = `<div class="finish">Your score: ${score} out of ${questions.length}</div>`;

    // Save the score in localStorage
    localStorage.setItem("quizScore", score);
  }
  
  // Add event listener to the "Start Quiz" button
  const startQuizBtn = document.querySelector(".home");
  startQuizBtn.addEventListener("click", () => {
    showQuestion();
  });

  // Retrieve the saved score from localStorage
  const savedScore = localStorage.getItem("quizScore");

  // Display the saved score on the page
  const resultsDiv = document.querySelector(".finish");
  resultsDiv.textContent = `Your score: ${savedScore} out of ${questions.length}`;
  