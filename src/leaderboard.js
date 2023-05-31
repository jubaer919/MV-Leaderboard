import axios from 'axios';

let gameID;
const body = document.querySelector('body');

async function createGame(name) {
  const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

  try {
    const response = await axios.post(baseURL, { name });
    [, , , gameID] = response.data.result.split(' ');

    return gameID;
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error hapend';
    body.appendChild(h2);
    throw error;
  }
}

async function getScores() {
  try {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
    const response = await axios.get(url);
    const scores = response.data.result;
    const list = document.querySelector('.name-num-list');
    list.innerHTML = '';
    scores.forEach((person) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-items');
      listItem.innerHTML = `<span class="span-name">${person.user}:</span>  <span class="span-number">${person.score}</span>`;
      list.appendChild(listItem);
    });
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error hapend';
    body.appendChild(h2);
  }
}

async function submitScore(user, score) {
  try {
    const data = {
      user,
      score,
    };
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores/`;
    await axios.post(url, data);

    // Clear input fields
    document.querySelector('.name-input').value = '';
    document.querySelector('.number-input').value = '';
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.innerText = '404 error hapend';
    body.appendChild(h2);
  }
}

async function main() {
  try {
    const gameName = 'Your Game Name';
    gameID = await createGame(gameName);

    // Refresh Button
    document.querySelector('.btn-refresh').addEventListener('click', getScores);

    // Submit Button
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
    h2.innerText = '404 error hapend';
    body.appendChild(h2);
  }
}

export default main;
