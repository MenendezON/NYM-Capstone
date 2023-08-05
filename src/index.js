import countItems from 'module/countItems.js';
import './css/style.css';


const apiUrl = 'https://api.tvmaze.com/shows';
const main = document.querySelector('main');
main.innerHTML = '';

const getComments = async (id) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xHKFbjrPNRXwlocSctHs/comments?item_id=${id}`);
  if (response.headers.get('content-type').includes('application/json')) {
    const data = await response.json();
    const element = document.querySelector('.comments');
    if (element) {
      element.innerHTML = `Comments (${data.length})`;
      data.forEach((comment) => {
        element.innerHTML += `
        <div class="commentStyle">
        <p><strong>${comment.username}</strong> - ${comment.creation_date}</p>
        <p>${comment.comment}</p>
        </div>
        `;
      });
    }
    return data;
  }
  const data = await response.text();
  return data;
};

const getLikes = async () => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xHKFbjrPNRXwlocSctHs/likes/');
  if (response.headers.get('content-type').includes('application/json')) {
    const data = await response.json();
    data.forEach((like) => {
      document.getElementsByClassName(like.item_id)[0].innerHTML = `${like.likes} likes`;
    });
    return data;
  }
  const data = await response.text();
  return data;
};

const addComment = async (id, username, comment) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xHKFbjrPNRXwlocSctHs/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      comment,
      item_id: id,
    }),
  });
  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  }
  getComments(id);
  return response.text();
};

const addLike = async (elem) => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xHKFbjrPNRXwlocSctHs/likes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: elem,
    }),
  }).then(() => {
    getLikes();
  });
};

const popupLaunch = (elem) => {
  const back = document.createElement('div');
  back.classList.add('fullScreen');
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const side0 = document.createElement('div');
  side0.classList.add('cover');
  const img = document.createElement('img');
  img.src = elem.image.original;
  img.alt = elem.name;
  side0.appendChild(img);
  popup.appendChild(side0);
  const side1 = document.createElement('div');
  side1.classList.add('details');
  const title = document.createElement('h2');
  title.textContent = elem.name;
  const subTitle = document.createElement('h3');
  subTitle.textContent = `${elem.type} | ${elem.language}`;
  const div = document.createElement('div');
  div.innerHTML = (elem.summary).replace('<b>', '');
  const ul = document.createElement('ul');
  for (let i = 0; i < elem.genres.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = elem.genres[i];
    ul.appendChild(li);
  }
  side1.appendChild(title);
  side1.appendChild(subTitle);
  side1.appendChild(div);
  side1.appendChild(ul);
  popup.appendChild(side1);

  const comments = document.createElement('div');
  comments.textContent = 'Hello';
  comments.classList.add('comments');

  side1.appendChild(comments);

  const form = document.createElement('form');
  const user = document.createElement('input');
  const hr = document.createElement('hr');
  user.type = 'text';
  user.placeholder = 'Type your username';
  const comment = document.createElement('textarea');
  comment.placeholder = 'Type your comment';
  comment.rows = 2;
  const btn = document.createElement('input');
  btn.type = 'submit';
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addComment(elem.id, user.value, comment.value);
  });
  form.appendChild(user);
  form.appendChild(hr);
  form.appendChild(comment);
  form.appendChild(btn);
  side1.appendChild(form);

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

  getComments(elem.id);
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
  icon.classList.add('fa', 'fa-heart');
  icon.addEventListener('click', () => {
    addLike(elem.id);
  });
  const text = document.createElement('p');
  text.classList.add(elem.id);
  text.textContent = '0 like';
  icon.appendChild(text);
  like.appendChild(icon);
  like.appendChild(text);

  titles.appendChild(title);
  titles.appendChild(like);
  const button = document.createElement('button');
  button.textContent = 'Comments';
  button.addEventListener('click', () => {
    popupLaunch(elem);
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
  const link = document.querySelector('a');
  link.innerHTML = `Home (${countItems()})`;
};

window.addEventListener('DOMContentLoaded', () => {
  getScores();
  getLikes();
});
