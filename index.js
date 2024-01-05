const TRANSLITE_DICTIONARY = {
  a: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'io',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: "'",
  э: 'e',
  ю: 'iu',
  я: 'ia',
};

function translit(str) {
  let translited = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i].toLowerCase() in TRANSLITE_DICTIONARY) {
      if (str[i] === str[i].toUpperCase()) {
        translited += TRANSLITE_DICTIONARY[str[i].toLowerCase()].toUpperCase();
      } else {
        translited += TRANSLITE_DICTIONARY[str[i]];
      }
    } else {
      translited += str[i];
    }
  }
  return translited;
}

function updateNumbers() {
  const allNumbers = document.querySelectorAll('.nmbr');
  for (let i = 0; i < allNumbers.length / 2; i += 1) {
    allNumbers[i].textContent = i + 1;
    allNumbers[allNumbers.length / 2 + i].textContent = i + 1;
  }
}

function cleanRow(element) {
  const currentNumber = element.parentNode.querySelector('.nmbr').textContent;
  if (currentNumber > 1) {
    const allNumbers = document.querySelectorAll('.nmbr');
    allNumbers.forEach((e) => {
      if (currentNumber === e.textContent) {
        e.parentNode.parentNode.removeChild(e.parentNode);
      }
    });
    updateNumbers();
  }
}
function constructInitialDiv(initial) {
  const initRow = document.createElement('div');
  initRow.className = 'rwInit';
  if (initial.length > 19) {
    initRow.setAttribute('data-tooltip', initial);
  }

  const number = document.createElement('div');
  number.className = 'nmbr';

  const init = document.createElement('div');
  init.className = 'init';

  const deleteIcon = document.createElement('div');
  deleteIcon.className = 'dlt dlt-init';
  deleteIcon.innerHTML = '<img src="./icons/close_icon_small.svg" alt="">';
  deleteIcon.addEventListener('click', () => {
    cleanRow(deleteIcon);
  });

  number.textContent = '1';
  init.textContent = initial;

  initRow.appendChild(number);
  initRow.appendChild(init);
  initRow.appendChild(deleteIcon);

  return initRow;
}

function constructTranlitDiv(initial) {
  const translitValue = translit(initial);

  const row = document.createElement('div');
  row.className = 'rwTrnslt';
  if (translitValue.length > 18) {
    row.setAttribute('data-tooltip', translitValue);
  }

  const number = document.createElement('div');
  number.className = 'nmbr nmbr-trnslt';

  const trnltd = document.createElement('div');
  trnltd.className = 'trnltd';

  const deleteIcon = document.createElement('div');
  deleteIcon.className = 'dlt';
  deleteIcon.innerHTML = '<img src="./icons/close_icon_small.svg" alt="">';
  deleteIcon.addEventListener('click', () => {
    cleanRow(deleteIcon);
  });

  number.textContent = '1';
  trnltd.textContent = translitValue;

  row.appendChild(number);
  row.appendChild(trnltd);
  row.appendChild(deleteIcon);

  return row;
}

function addRow() {
  const inputField = document.getElementById('input-field');
  if (inputField.value.length > 0) {
    const initialValue = inputField.value;
    inputField.value = '';
    const initRow = constructInitialDiv(initialValue);
    const trnsltRow = constructTranlitDiv(initialValue);
    document.getElementById('cntr-init').appendChild(initRow);
    document.getElementById('cntr-trnslt').appendChild(trnsltRow);
    updateNumbers();
  }
}

function cleanAll() {
  const initChild = document.getElementById('cntr-init').firstElementChild;
  const trsltChild = document.getElementById('cntr-trnslt').firstElementChild;
  document.getElementById('cntr-init').innerHTML = '';
  document.getElementById('cntr-init').appendChild(initChild);
  document.getElementById('cntr-trnslt').innerHTML = '';
  document.getElementById('cntr-trnslt').appendChild(trsltChild);
}

const addButton = document.getElementById('add-button');
const cleanButton = document.getElementById('clean-button');
const inputField = document.getElementById('input-field');

addButton.addEventListener('click', addRow);
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addRow();
  }
});

cleanButton.addEventListener('click', cleanAll);

const allDeleteIcons = document.querySelectorAll('.dlt');
allDeleteIcons.forEach((element) => {
  element.addEventListener('click', () => {
    cleanRow(element);
  });
});
