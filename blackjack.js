let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let newCardEl = document.getElementById("new-card-el");
let playerEl = document.getElementById("player-el");

let player = {
  name: "Your",
  balance: 200,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = true;
let message = "";

function startGame() {
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  playerEl.textContent = player.name + " " + "Balance: " + "$" + player.balance;
  renderGame();
}

function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  if (randomCard > 10) {
    return 10;
  } else if (randomCard === 1) {
    return 11;
  } else {
    return randomCard;
  }
}

function renderGame() {
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
    isAlive = true;
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    let increaseBalance = (player.balance += 10);
    playerEl.textContent =
      player.name + " " + "Balance: " + "$" + increaseBalance + "(Win +$10)";
  } else {
    message = "You're out of the game!";
    isAlive = false;
    let reduceBalance = (player.balance -= 10);
    playerEl.textContent =
      player.name + " " + "Balance: " + "$" + reduceBalance + " (Lose -$10)";
  }
  messageEl.textContent = message;
  sumEl.textContent = "Sum: " + sum;
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
}

function newCard() {
  if (isAlive === true && sum !== 21) {
    let addCard = getRandomCard();
    sum += addCard;
    cards.push(addCard);
    renderGame();
  }
}
