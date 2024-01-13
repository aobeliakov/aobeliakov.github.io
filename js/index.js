/**
 *
 */
function createCard(index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-index', `${index}`);
  return card;
}

/**
 *
 * @param {*} numberOfCards
 */
function createCards(numberOfCards) {
  console.log('click');
  const cardsContainer = document.getElementById('cards-container');
  for (let i = 0; i < numberOfCards; i += 1) {
    cardsContainer.append(createCard(i));
  }
}

const easyBtn = document.getElementById('btn-easy');
easyBtn.addEventListener('click', () => {
  setUpGame(6, 4);
});

const medBtn = document.getElementById('btn-med');
medBtn.addEventListener('click', () => {
  setUpGame(8, 3);
});

const hardBtn = document.getElementById('btn-hard');
hardBtn.addEventListener('click', () => {
  setUpGame(12, 2);
});

const resetBtn = document.getElementById('btn-reset');
resetBtn.addEventListener('click', () => {
  reset();
});
/**
 *
 */
function hideBtns() {
  const buttons = document.getElementById('buttons');
  buttons.style.display = 'none';
  const resetBtn = document.getElementById('reset-container');
  resetBtn.style.display = 'block';
}

/**
 *
 */
function reset() {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';
  const buttons = document.getElementById('buttons');
  buttons.style.display = 'block';
  const resetBtn = document.getElementById('reset-container');
  resetBtn.style.display = 'none';
}

/**
 *
 */
function getRandomListOfCards(numberOfCards) {
  const arr = Array.from(Array(numberOfCards).keys());
  const numberOfColoredCards = numberOfCards / 2;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfColoredCards);
}

/**
 *
 */
function setUpGame(numberOfCards, sec) {
  hideBtns();
  createCards(numberOfCards);
  const coloredCardsIds = getRandomListOfCards(numberOfCards);
  cards = document.querySelectorAll('.card');
  console.log(coloredCardsIds);
  for (let i = 0; i < numberOfCards; i += 1) {
    let card = document.querySelector(`[data-index='${i}']`);
    if (coloredCardsIds.includes(i)) {
      card.style.background = 'yellow';
    }
  }
  setTimeout(function () {
    for (let i = 0; i < numberOfCards; i += 1) {
      let card = document.querySelector(`[data-index='${i}']`);
      if (coloredCardsIds.includes(i)) {
        card.style.background = 'white';
      }
      card.addEventListener('click', () => {
        const index = card.getAttribute('data-index');
        console.log('click', index, coloredCardsIds.includes(parseInt(index)));
        if (coloredCardsIds.includes(parseInt(index))) {
          console.log('click', index);
          card.style.background = 'yellow';
        } else {
          console.log('wrong');
          card.style.background = 'red';
          setTimeout(function() {
            alert('Wrong!');
            reset();
          }, 500);
        }
      });
    }
  }, sec * 1000);
}
