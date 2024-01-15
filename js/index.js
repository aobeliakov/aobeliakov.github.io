const NOUNS = [
  'river',
  'enthusiasm',
  'city',
  'army',
  'drawer',
  'college',
  'attitude',
  'refrigerator',
  'improvement',
  'signature',
  'chemistry',
  'literature',
  'suggestion',
  'cousin',
  'member',
  'analysis',
  'steak',
  'language',
  'communication',
  'health',
  'bathroom',
  'poet',
  'anxiety',
  'variation',
  'video',
  'coffee',
  'opportunity',
  'engine',
  'assumption',
];

const ADJECTIVES = [
  'Responsible',
  'Certain',
  'Feeble',
  'Hot',
  'Recondite',
  'Overrated',
  'Resonant',
  'Shocking',
  'Phobic',
  'Uppity',
  'Teeny-tiny',
  'Therapeutic',
  'Adjoining',
  'Shy',
  'Healthy',
  'Uninterested',
  'Woozy',
  'Acceptable',
  'Inner',
  'Eatable',
  'Loutish',
  'Obtainable',
  'Jealous',
  'Boiling',
  'Grubby',
  'Eastern',
  'Tasteless',
  'Accidental',
  'Aromatic',
  'Dead'
];

let score = 0;
let sec = 10;
let timer = setInterval(function () {
  document.getElementById('timer').innerHTML = sec;
  sec--;
  if (sec < 0) {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = 'GAME OVER';
    // document.getElementById('word').style.visibility = 'hidden';
    document.getElementById('word').innerHTML = '';
    document.getElementById('score').style.fontSize = '50px';
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

changePhrase();

let currentTimer;
let currentIndex = 0;
document.onkeydown = function (e) {
  const spans = document.querySelectorAll('span');
  if (e.key === spans[currentIndex].textContent) {
    if (spans[currentIndex].textContent === ' ') {
      spans[currentIndex].style.textDecoration = 'underline'; 
    }
    spans[currentIndex].style.color = 'lime';
    console.log('yeah');
    if (currentIndex === spans.length - 1) {
      changePhrase();
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

function changePhrase() {
  const newNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const newAdj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const wordDiv = document.getElementById('word');
  const wrappedNewWord = wrapWithSpan(`${newAdj} ${newNoun}`);
  wordDiv.innerHTML = wrappedNewWord;
}
