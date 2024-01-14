const container = document.querySelector('.container');
const userName = localStorage.getItem('userName');
const helloDiv = document.createElement('h3');
const scoreDiv = document.createElement('div');
scoreDiv.className = 'score-div';
const scoreText = document.createElement('span');
scoreText.textContent = 'Твои очки: ';
const score = document.createElement('span');
score.id = 'score';
score.textContent = '0';
const stopButton = document.querySelector('.button.stop');
const resultScore = document.querySelector('.result-score');

scoreDiv.append(scoreText);
scoreDiv.append(score);
container.prepend(scoreDiv);

helloDiv.textContent = `Привет, ${userName}`;
container.prepend(helloDiv);

const square = document.querySelector('.square');
let isActive = true;

let intervalId = window.setInterval(() => {
  if (isActive) {
    square.style.background = 'grey';
    isActive = false;
  } else {
    square.style.background = '#04aa6d';
    isActive = true;
  }
}, 1000 * Math.random() * 7);

square.addEventListener('click', checkScore);

function checkScore() {
  if (isActive) {
    score.textContent = parseInt(score.textContent) + 5;
  } else {
    score.textContent = '0';
  }
}

stopButton.addEventListener('click', () => {
  stopButton.style.display = 'none';
  square.style.display = 'none';
  square.style.display = 'none';
  scoreDiv.style.display = 'none';
  resultScore.style.display = 'block';
  resultScore.textContent = `Твой окончательный счет: ${score.textContent}`;
  window.clearInterval(intervalId);
});
