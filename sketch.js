let table;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let radio;
let submitButton;
let resultText = '';
let resultColor = '';
let questionP; // 儲存問題元素

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffe2a3"); // 背景顏色

  displayQuestion();
}

function draw() {
  background("#ffe2a3"); // 背景顏色
  
  // 顯示測驗結果
  textSize(50);
  fill(resultColor);
  text(resultText, windowWidth / 2 - 50, windowHeight / 2 + 100);
}

function displayQuestion() {
  // 如果有舊的問題，先清除
  if (questionP) {
    questionP.remove();
  }
  if (radio) {
    radio.remove();
  }

  let question = table.getString(currentQuestionIndex, 'question');
  let option1 = table.getString(currentQuestionIndex, 'option1');
  let option2 = table.getString(currentQuestionIndex, 'option2');
  let option3 = table.getString(currentQuestionIndex, 'option3');

  // 顯示問題
  questionP = createP(question);
  questionP.position(windowWidth / 2 - 100, windowHeight / 2 - 60);

  // 顯示選項
  radio = createRadio();
  radio.option(option1);
  radio.option(option2);
  radio.option(option3);
  radio.position(windowWidth / 2 - 50, windowHeight / 2 - 20);

  // 顯示送出按鈕
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - 20, windowHeight / 2 + 20);
  submitButton.mousePressed(submitAnswer);
}

function submitAnswer() {
  let answer = radio.value();
  let correctAnswer = table.getString(currentQuestionIndex, 'correct');

  if (answer === correctAnswer) {
    resultText = '答對了！';
    resultColor = 'green';
    correctAnswers++;
  } else {
    resultText = '答錯了！';
    resultColor = 'red';
    incorrectAnswers++;
  }

  console.log('選擇的答案是: ' + answer);

  // 將按鈕文字改為 "下一題" 並改變位置
  submitButton.html('下一題');
  submitButton.position(windowWidth / 2 - 20, windowHeight / 2 + 60);
  submitButton.mousePressed(nextQuestion);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < table.getRowCount()) {
    displayQuestion();
    resultText = ''; // 清除結果
    resultColor = '';
    submitButton.html('送出');
    submitButton.position(windowWidth / 2 - 20, windowHeight / 2 + 20);
    submitButton.mousePressed(submitAnswer);
  } else {
    displayResult();
  }
}

function displayResult() {
  clear(); // 清除畫布
  background("#ffe2a3");

  // 顯示測驗結束
  textSize(50);
  fill('black');
  text(`測驗結束！`, windowWidth / 2 - 150, windowHeight / 4);
  textSize(30);
  text(`答對題數: ${correctAnswers}`, windowWidth / 2 - 100, windowHeight / 2 - 30);
  text(`答錯題數: ${incorrectAnswers}`, windowWidth / 2 - 100, windowHeight / 2 + 30);

  // 顯示總分數
  let totalQuestions = table.getRowCount();
  textSize(40);
  text(`總分: ${correctAnswers} / ${totalQuestions}`, windowWidth / 2 - 120, windowHeight / 1.5);
}
