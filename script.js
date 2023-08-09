"use strict";
//What to do next
//also make the nav-bar sticky -> get a solution for that.
//Maybe even implement a progress bar

//Then
//deploy to GIT.

//variables
const isAlreadyAnswered = new Array(10);
isAlreadyAnswered.fill(false);
let answersArray = [];
//documents
const startDiv = document.querySelector(`.start-quiz`);
const startBtn = document.querySelector(`#start-btn`);
const questionElements = document.querySelectorAll(`.question`);

//start
//hide all questions;
questionElements.forEach((element) => {
  element.classList.add(`hidden`);
});

//start questions after user pressed on start;
startBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  document.getElementById(`question--0`).classList.remove(`hidden`);
  startDiv.remove();
});

//QUESTION FUNCTIONS!

//add a new question function
const addNewQuestion = (questionIndex, questionElement) => {
  document
    .getElementById(`question--${questionIndex + 1}`)
    .classList.remove(`hidden`);
  questionElement[questionIndex + 1]?.scrollIntoView({ behavior: `smooth` });
};

//add answer function
const addAnswer = (
  answersArr,
  questionElement,
  answerElement,
  queIndex,
  ansIndex
) => {
  //store answer and store in array
  isAlreadyAnswered[queIndex] = true;
  answersArr.push(answerElement.getAttribute(`value`));
  highlightAnswer(questionElement.querySelectorAll(`li`), ansIndex);
};

//change the existing answer function
const changeExistingAnswer = (
  answersArr,
  questionElement,
  answerElement,
  queIndex,
  ansIndex
) => {
  //just change the answer in the appropiate index
  answersArr[queIndex] = answerElement.getAttribute(`value`);
  highlightAnswer(questionElement.querySelectorAll(`li`), ansIndex);
};

//Main question logic
questionElements.forEach((question, questionIndex) => {
  question.querySelectorAll(`li`).forEach((answer, answerIndex) => {
    answer.addEventListener(`click`, function () {
      //first check if the question is not answered -> to display the next question and save the answer
      if (!isAlreadyAnswered[questionIndex]) {
        //now check if it isn't the last question
        if (questionIndex != questionElements.length - 1) {
          //add question
          addNewQuestion(questionIndex, questionElements);
          //add answer
          addAnswer(answersArray, question, answer, questionIndex, answerIndex);
        }
        //if it is the last question
        else {
          //add answer without creating a new question
          addAnswer(answersArray, question, answer, questionIndex, answerIndex);
          //add the bar
          createResultBar(answersArray, questionElements);
        }
      }
      //if the question is already answered just change the result
      else {
        changeExistingAnswer(
          answersArray,
          question,
          answer,
          questionIndex,
          answerIndex
        );
      }
    });
  });
});

//if logo is pressed - reload quiz
const reloadQuiz = () => {
  window.location.reload();
};

//reload
document
  .querySelectorAll(`.logo`)
  .forEach((logo) => logo.addEventListener(`click`, reloadQuiz));

//functions

//modify -> can be better
function highlightAnswer(answers, selected) {
  answers.forEach((answer, index) => {
    if (index == selected) answer.style.backgroundColor = `#66fcf28f`;
    else
      answer.style.background = `linear-gradient(to right, #9661ba25, #66fcf26c, #9661ba25)`;
  });
}

//modify CSS
function createResultBar(answersArr, questionElem) {
  //create the show results element!
  const result = document.createElement(`div`);
  result.classList.add(`submit-answer`);
  result.innerHTML = `<h1>You've completed the quiz!</h1>
    <input type="button" value = "Show me the result!"/>`;
  document.querySelector(`.quiz`).appendChild(result);
  result.scrollIntoView({ behavior: `smooth` });

  //now check if it is pressed
  result.querySelector(`input`).addEventListener(`click`, function () {
    //and call the function to generate the result of the quiz!
    generateQuizResult(answersArr, questionElem, result);
  });
}

function generateQuizResult(answersArr, questionElem, lastELement) {
  //remove all the questions
  questionElem.forEach((element) => {
    element.remove();
  });

  //remove the final input button
  lastELement.remove();

  //now generate the result
  const resultSum = Number(
    answersArr.reduce((sum, acc) => Number(sum) + Number(acc))
  );
  //create a new element and add the specific class
  const generatedResult = document.createElement(`div`);
  generatedResult.classList.add(`generated-result`);

  //compare the results and then output.
  if (resultSum <= 7) {
    console.log(`here`);
    generatedResult.innerHTML = `<h1> You Got: <span>Neo-hippie!</span></h1>
      <img src = "./results/result1.png" class = "result-img"/>
      <p>The environment, peace, world hunger, homelessness, animal rights, 
      and karma. Some stuff that can be on your mind at any given moment. 
      You are deeply passionte and caring about the world and people in it. 
      You are an empathic person and fight for what you believe in!</p>`;
  } else if (resultSum <= 15) {
    generatedResult.innerHTML = `<h1> You got: <span>A Follower!</span></h1>
    <img src = "./results/result2.png" class = "result-img"/>
    <p>You always fall back on your friends and end to follow their leads, 
    You know that's hip and trendy. You are always caught up on the latest trends and celebrity gossip. 
    You are a fashion icon and love to experiment with new things in life.</p>`;
  } else if (resultSum <= 22) {
    generatedResult.innerHTML = `<h1> You got: <span>Prep!</span></h1>
    <img src = "./results/result3.png" class = "result-img"/>
    <p>You bring back to class the pop culture world. 
    You know what's happening in the world and have lots of friends. 
    You love to follow famous celebrities and influencers. 
    You are the true fan of pop culture! You are super fun to be around.</p>`;
  } else if (resultSum <= 30) {
    generatedResult.innerHTML = `<h1> You got: <span>Sweetie!</span></h1>
    <img src = "./results/result4.png" class = "result-img"/>
    <p> You are sweet and carind and romantic and classic, 
    and joy bursts from you. You love to enjoy life, and people love your naturally joygful demeanor. 
    You take full pleasure in the little things in life. You are superbly amazing.</p>`;
  }
  console.log(generatedResult.innerHTML);
  document.querySelector(`.quiz`).appendChild(generatedResult);
}
