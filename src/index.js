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
    });
}
getPokes();

const template = (bud) => `This is ${bud.name}`;

// DOM building
function renderApp(STATE) {
  const list = document.querySelector('.list');
  STATE.forEach((i) => {
    list.insertAdjacentHTML('afterbegin', template(i));
  });

  const header = document.querySelector('.container');
  const headerH1 = document.querySelector('.container h1');
  header.insertAdjacentHTML('afterbegin', Header('This is Base App'));
}
