const input = document.getElementById('input');
let number;
let evaluationString = '';
isEvaluating = false;

const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');

const equalBtn = document.getElementById('equal');

plusBtn.addEventListener('click', () => getNumber(plusBtn));
minusBtn.addEventListener('click', () => getNumber(minusBtn));
multiplyBtn.addEventListener('click', () => getNumber(multiplyBtn));
divideBtn.addEventListener('click', () => getNumber(divideBtn));

equalBtn.addEventListener('click', evaluate);

function getNumber(btn) {
  resetBtnsStyle();
  btn.style.color = 'white';
  btn.style.background = 'black';
  number = input.value;
  if (!number) number = '0';
  evaluationString = `${number} ${btn.textContent} `;
  input.value = evaluationString;
  console.log(evaluationString);
  evaluationString = '';
}

function evaluate() {
  resetBtnsStyle();
  try {
    const result = eval(input.value);
    const resultString = `${input.value} = ${result}`;
    console.log(resultString);
    addToHistory(resultString);
    input.value = '';
  } catch (e) {
    if (e instanceof SyntaxError) {
      input.value = '';
      alert('Please use a correct mathematical expression!');
    }
  }
}

function addToHistory(result) {
  console.log('history');
  const history = document.querySelector('.history');
  const operation = document.createElement('div');
  operation.className = 'operation';
  //<span class="counter">1)</span>
  const counterSpan = document.createElement('span');
  counterSpan.className = 'counter';
  const resultSpan = document.createElement('span');
  resultSpan.className = 'result';
  resultSpan.textContent = result;

  operation.append(counterSpan);
  operation.append(result);

  history.prepend(operation);

  recount();
}

function resetBtnsStyle() {
  const btns = document.querySelectorAll('.sign');
  console.log(btns);
  for (let i = 0; i < btns.length; i++) {
    btns[i].style.color = 'black';
    btns[i].style.background = 'white';
  }
}

function recount() {
  const history = document.querySelector('.history');

  const counters = document.querySelectorAll('.counter');
  for (let i = 0; i < counters.length; i++) {
    counters[i].textContent = `${i+1}) `
    if (i >= 10) {
      history.removeChild(counters[i].parentNode);
    }
  }
}
