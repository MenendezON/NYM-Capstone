import './css/style.css';

const main = document.querySelector('main');

main.innerHTML = '';

for (let i = 0; i <= 5; i += 1) {
  const div = document.createElement('div');
  div.classList.add('cards');
  const img = document.createElement('img');
  img.src = 'https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg';
  const titles = document.createElement('div');
  const title = document.createElement('div');
  title.classList.add('title');
  const p = document.createElement('p');
  p.textContent = `Titre ${i + 1}`;
  title.appendChild(p);
  const like = document.createElement('div');
  like.classList.add('like');
  const icon = document.createElement('i');
  icon.classList.add('fa', 'fa-heart-o');
  icon.addEventListener('click', () => {
    console.log('You just like this image');
  });
  const text = document.createElement('p');
  text.textContent = '0 Like';
  icon.appendChild(text);
  like.appendChild(icon);
  like.appendChild(text);

  titles.appendChild(title);
  titles.appendChild(like);
  const button = document.createElement('button');
  button.textContent = 'Comments';

  div.appendChild(img);
  div.appendChild(titles);
  div.appendChild(button);
  main.appendChild(div);
}
