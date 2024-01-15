const words = [
  'argument',
  'lounge',
  'miracle',
  'distinct',
  'fight',
  'monstrous',
  'use',
  'layout',
  'approach',
  'credit',
  'trunk',
  'reveal',
  'crosswalk',
  'history',
  'bowel',
  'color',
  'war',
  'trick',
  'reconcile',
  'bacon',
  'texture',
  'slab',
  'role',
  'hit',
  'variation',
  'patch',
  'participa',
  'chew',
  'frog',
  'available',
];

let score = 0;
let sec = 10;
let timer = setInterval(function () {
  document.getElementById('timer').innerHTML = sec;
  sec--;
  if (sec < 0) {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = 'GAME OVER';
    document.getElementById('word').style.visibility = 'hidden';
  }
}, 1000);

function wrapWithSpan(word) {
  let wrapped = '';
  for (let i = 0; i < word.length; i += 1) {
    wrapped += `<span data-index="${i}">${word.charAt(i)}</span>`;
  }
  console.log(wrapped);
  return wrapped;
}

changeWord();

let currentTimer;
let currentIndex = 0;
document.onkeydown = function (e) {
  const spans = document.querySelectorAll('span');
  if (e.key === spans[currentIndex].textContent) {
    spans[currentIndex].style.color = 'lime';
    console.log('yeah');
    if (currentIndex === spans.length - 1) {
      changeWord();
      score += 1;
      scoreDiv = document.getElementById('score');
      scoreDiv.textContent = `Your score: ${score}`;
      if (currentTimer) {
        clearInterval(currentTimer);
      }
      currentIndex = 0;
    } else {
      currentIndex += 1;
      sec += 1;
    }
  } else if (e.key !== 'Shift') {
    console.log('wrong');
    sec -= 5;
    let wrong = document.getElementById('wrong');
    wrong.style.visibility = 'initial';
    setTimeout(() => {
      wrong.style.visibility = 'hidden';
    }, 2000);
  } 
};

function changeWord() {
  const newWord = words[Math.floor(Math.random() * words.length)];
  console.log('newWord', newWord);
  const wordDiv = document.getElementById('word');
  const wrappedNewWord = wrapWithSpan(newWord);
  console.log(wrappedNewWord);
  wordDiv.innerHTML = wrappedNewWord;
  console.log(word);
}
