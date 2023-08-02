import './css/style.css';

const main = document.querySelector('main');

main.innerHTML = '';
const popupLaunch = () => {
  const back = document.createElement('div');
  back.classList.add('fullScreen');
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const side0 = document.createElement('div');
  side0.innerHTML = `<img src="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg" alt="">`;
  popup.appendChild(side0);
  const side1 = document.createElement('div');
  side1.innerHTML = `<h2>Titre</h2><h3><em>by Autheur</em></h3><p><em>added créé par </em></p><p>description</p>`;
  popup.appendChild(side1);
  const link = document.createElement('a');
  link.innerText = 'Close this';
  link.addEventListener('click', ()=>{
    document.body.removeChild(document.querySelector('.fullScreen'));
  return false;
  });
  link.href = '#';
  side1.appendChild(link);
  back.appendChild(popup);
  document.body.appendChild(back);
  return false;
};
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
  button.addEventListener('click', () => {
    popupLaunch();
  });

  div.appendChild(img);
  div.appendChild(titles);
  div.appendChild(button);
  main.appendChild(div);
}
