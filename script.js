"use strict";

// Selecting elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const currrent0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

// Holdiing player scores
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle("player--active");
    player1EL.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
    // 1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
        // add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        // switch to next player
        switchPlayer();
    }
});

btnHold.addEventListener("click", function () {
    console.log([activePlayer]);
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
        playing = false;
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("winner");
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");
    } else {
        switchPlayer();
    }
    // finish the game
    // switch to the next player
});
