import './css/style.css';

const main = document.querySelector('main');

main.innerHTML = '';

const apiUrl = 'https://api.tvmaze.com/shows';

const popupLaunch = () => {
  const back = document.createElement('div');
  back.classList.add('fullScreen');
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const side0 = document.createElement('div');
  popup.appendChild(side0);
  const img = document.createElement('img');
  img.src = elem.image.original;
  img.alt = elem.name;
  side0.appendChild(img);
  const title = document.createElement('h2');
  title.textContent = elem.name;
  const subTitle = document.createElement('h3');
  subTitle.textContent = `${elem.type} | ${elem.language}`;
  const div = document.createElement('div');
  div.innerHTML = (elem.summary).replace('<b>', '');
  const ul = document.createElement('ul');
  for (let i = 0; i < elem.genres.length; i++) {
    const li = document.createElement('li');
    li.textContent = elem.genres[i];
    ul.appendChild(li);
  }
  side1.appendChild(title);
  side1.appendChild(subTitle);
  side1.appendChild(div);
  side1.appendChild(ul);

  const side1 = document.createElement('div');
  popup.appendChild(side1);
  const link = document.createElement('a');
  link.innerText = 'Close this';
  link.addEventListener('click', () => {
    document.body.removeChild(document.querySelector('.fullScreen'));
    return false;
  });
  link.href = '#';
  side1.appendChild(link);
  back.appendChild(popup);
  document.body.appendChild(back);
  return false;
};

const displayCards = (elem) => {
  const div = document.createElement('div');
  div.classList.add('cards');
  const img = document.createElement('img');
  img.src = `${elem.image.medium}`;
  const titles = document.createElement('div');
  const title = document.createElement('div');
  title.classList.add('title');
  const p = document.createElement('p');
  p.textContent = `${elem.name}`;
  title.appendChild(p);
  const like = document.createElement('div');
  like.classList.add('like');
  const icon = document.createElement('i');
  icon.classList.add('fa', 'fa-heart-o');
  icon.addEventListener('click', () => {

  });
  const text = document.createElement('p');
  text.textContent = '0 like';
  icon.appendChild(text);
  like.appendChild(icon);
  like.appendChild(text);

  titles.appendChild(title);
  titles.appendChild(like);
  const button = document.createElement('button');
  button.textContent = 'Comments';
  button.addEventListener('click', () => {
    popupLaunch();
  });
  div.appendChild(img);
  div.appendChild(titles);
  div.appendChild(button);
  main.appendChild(div);
};

const getScores = async () => {
  const response = await fetch(`${apiUrl}`);
  const json = await response.json();
  json.forEach((element) => {
    displayCards(element);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  getScores();
});
