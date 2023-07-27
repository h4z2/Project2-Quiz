"use strict"
const questions=[
{ question: "When did humanity first land on the moon?",
  options: ["1964", "1967", "1970", "1969"],
  answer: "1969", },
{ question: "What was the year we began exploring space?",
  options: ["1955", "1958", "1957", "1952"],
  answer: "1958", },
{ question: "What year was the James Webb Telescope launched?",
  options: ["2021", "2019", "2023", "2022"],
  answer: "2021", },
{ question: "When was the Hubble Telescope launched?",
  options: ["1987", "1993", "1990", "1981"],
  answer: "1990", },
{ question: "How many humans have left earth in total?",
  options: ["12", "24", "32", "29"],
  answer: "24", },
];
  let currentQuestion = 0;
  let score = 0;

function showQuestion() {
  const questionContainer = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  
  if (currentQuestion < questions.length) {
  questionContainer.textContent = questions[currentQuestion].question;
  optionsContainer.innerHTML = "";
  
  for (let option of questions[currentQuestion].options) {
  const button = document.createElement("button");
  button.textContent = option;
  button.classList.add("option", "button-style");
  
  button.addEventListener("click", checkAnswer);
  optionsContainer.appendChild(button); }
  } else {
  showResults(); } }
  
function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = questions[currentQuestion].answer;
  
  if (selectedAnswer === correctAnswer) {
  score++; }
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
  showQuestion();
  } else {
  showResults(); } }
  
function showResults() {
  const quizTile = document.querySelector(".quiztile");
  quizTile.innerHTML = `<div class="finish">Your score: ${score} out of ${questions.length}</div>`;
  localStorage.setItem("quizScore", score); }
  
  const startQuizBtn = document.querySelector(".home");
  startQuizBtn.addEventListener("click", () => {
  showQuestion(); });
  const savedScore = localStorage.getItem("quizScore");

  const resultsDiv = document.querySelector(".finish");
  resultsDiv.textContent = `Your score: ${savedScore} out of ${questions.length}`;
  