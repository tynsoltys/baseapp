import './style.scss';
import { Header } from './components/header';

console.log(`this is index`);

// SET INITIAL APPLICATION STATE
let STATE = [];

function getPokes() {
  fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((res) => res.json())
    .then((res) => {
      STATE = [...res.results];
      console.log(STATE);
      renderApp(STATE);
    })
    .catch((err) => console.error(`🤔 ${err} has occured!`));
}
getPokes();

const template = (bud) =>
  `<li class="pokeItem" data-url=${bud.url}>${bud.name}</li>`;

// DOM building
function renderApp(STATE) {
  const list = document.querySelector('.main-list');
  STATE.forEach((i) => {
    list.insertAdjacentHTML('afterbegin', template(i));
  });

  const header = document.querySelector('.container');
  const headerH1 = document.querySelector('.container h1');
  header.insertAdjacentHTML('afterbegin', Header('Pokemon App'));
  initListClicks();
}

function initListClicks() {
  const allListItems = document.querySelectorAll('li.pokeItem');
  allListItems.forEach((i) =>
    i.addEventListener('click', function() {
      const pokeUrl = i.dataset.url;
      fetch(i.dataset.url)
        .then((res) => res.json())
        .then((res) => renderPoke(res))
        .catch((err) => console.error(`🤔 ${err} has occured!`));
    })
  );
}

function renderPoke(data) {
  const mainSection = document.querySelector('main');
  mainSection.innerHTML = '';
  console.log(data);
  const { sprites, moves, abilities, name } = data;
  const pokeTemplate = `<div>
    <h2>${name}</h2>
    <h4>Sprites:</h4>
    <ul class="sprites-list">
      ${Object.entries(sprites)
        .map((s) => {
          if (s[1] === null) {
            console.log(`no sprite available for ${s[0]}`);
          } else {
            return `<img src=${s[1]} alt=${s[0]} title=${s[0]}/>`;
          }
        })
        .join('')}
    </ul>
    <h4>Abilities:</h4>
      <ul class="abilities-list">
        ${abilities.map((a) => `<li>` + a.ability.name + `</li>`).join('')}
      </ul>
    <h4>Moves:</h4>
    <ul class="moves-list">
      ${moves.map((m) => `<li>` + m.move.name + `</li>`).join('')}
    </ul>
  </div>`;
  mainSection.insertAdjacentHTML('afterbegin', pokeTemplate);
}
