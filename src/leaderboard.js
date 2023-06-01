let gameID;
const body = document.querySelector('body');

const createGame = async (name) => {
  const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    [, , , gameID] = data.result.split(' ');

    return gameID;
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error happened';
    body.appendChild(h2);
    throw error;
  }
};

const getScores = async () => {
  try {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
    const response = await fetch(url);
    const data = await response.json();
    const scores = data.result;
    const list = document.querySelector('.name-num-list');
    list.innerHTML = '';
    scores.forEach((person) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-items');
      listItem.innerHTML = `<span class="span-name">${person.user}</span> : <span class="span-number">${person.score}</span>`;
      list.appendChild(listItem);
    });
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error happened';
    body.appendChild(h2);
  }
};

const submitScore = async (user, score) => {
  try {
    const data = {
      user,
      score,
    };
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    document.querySelector('.name-input').value = '';
    document.querySelector('.number-input').value = '';
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error happened';
    body.appendChild(h2);
  }
};

const main = async () => {
  try {
    const gameName = 'Leaderboard game';
    gameID = await createGame(gameName);

    document.querySelector('.btn-refresh').addEventListener('click', getScores);

    document.querySelector('.btn-submit').addEventListener('click', () => {
      const userInput = document.querySelector('.name-input');
      const scoreInput = document.querySelector('.number-input');

      const user = userInput.value.trim();
      const score = scoreInput.value.trim();

      if (!user || !score) {
        return;
      }

      submitScore(user, score);
    });
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error happened';
    body.appendChild(h2);
  }
};

export default main;
