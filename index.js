// Напиши обработчики здесь
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const input = document.getElementById('input');
  if (input.value) {
    localStorage.setItem('userName', input.value);
    window.open('./gamePage.html', '_self');
  }
});