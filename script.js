'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let  activePlayer, playing, current;


// Starting conditions
const init = function () {

  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

    current =  [0, 0];
   
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
btnRoll.disabled = false;
};
 init();


const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
 
  current[activePlayer] = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


btnRoll.addEventListener('click', function () {
 
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

    // Add dice to current score
    current[activePlayer] += dice;  
 document.getElementById(`current--${activePlayer}`).textContent = current[activePlayer];

    if (dice === 1) switchPlayer();
    
});


btnHold.addEventListener('click', function () {
  if (playing) {
   
   let scoreIndicator = Number(document.getElementById(`score--${activePlayer}`).textContent) + Number(document.getElementById(`current--${activePlayer}`).textContent);

  document.getElementById(`score--${activePlayer}`).textContent = scoreIndicator;

    
    if (scoreIndicator >= 100) {
      // Finish the game
      playing = false;
      btnRoll.disabled = true;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

