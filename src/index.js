import './css/style.css';

const main = document.querySelector('main');

main.innerHTML = '';

for (let i = 0; i <= 7; i += 1) {
  const div = document.createElement('div');
  div.classList.add('cards');
  main.appendChild(div);
}