const GAME_NODE = document.querySelector(".game__board");
const VICTORY_TEXT = document.querySelector(".game__subtitle");
const START_GAME_BTN = document.querySelector("#game-btn");

const CARD_ELEMENTS = [
'img/memory_game/game_cog.jpg',
'img/memory_game/game_coin.webp',
'img/memory_game/game_plant.webp',
'img/memory_game/game_star.jpg',
'img/memory_game/game_mario.jpg',
'img/memory_game/game_yoshi.jpg']

const CARD_AMOUNT = 12;
let VISIBLE_CARDS =[];

START_GAME_BTN.addEventListener('click', startGame);

function startGame() {
    VICTORY_TEXT.classList.remove('active');
    GAME_NODE.innerHTML = "";
    VISIBLE_CARDS = [];

    const CARDS = generateArray(CARD_ELEMENTS, CARD_AMOUNT);
    CARDS.forEach((fruit) => {
        renderCard(fruit)
    })
}

function generateArray(fruits, amount){
    if (fruits.length * 2 < amount) {
        throw new Error("Not enough unique elements in fruits to generate the required array");
    }

    const randomArray = [];
    const elementCounts = new Map();

    for (let fruit of fruits){
        elementCounts.set(fruit, 0);
    }

    while(randomArray.length < amount){
        const randomIndex = Math.floor(Math.random() * fruits.length);
        const randomElement = fruits[randomIndex];

        if(elementCounts.has(randomElement) && elementCounts.get(randomElement) < 2){
            let count = elementCounts.get(randomElement) + 1;
            randomArray.push(randomElement);
            elementCounts.set(randomElement, count)
        }
    }
    return randomArray
}

function renderCard(fruit){
    const card = document.createElement("div");
    card.classList.add("game__card");

    const cardFront = document.createElement("div");
    cardFront.classList.add("game__card_front");
    const imgFruit = document.createElement("img");
    imgFruit.classList.add("game__img");
    imgFruit.src = fruit;

    const cardBack = document.createElement("div");
    cardBack.classList.add("game__card_back");
    cardBack.innerHTML = "?";

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    cardFront.appendChild(imgFruit);

    card.addEventListener("click", () => handleCardClick(card))
    GAME_NODE.appendChild(card)
}

function handleCardClick(card){
    if(card.classList.contains("active")){
        return
    }

    card.classList.add("active");
    VISIBLE_CARDS.push(card)

    if (VISIBLE_CARDS.length % 2 !== 0) {
        return
    }

    const [pre, last] = VISIBLE_CARDS.slice(-2);
    const preImg = pre.querySelector('.game__img').src;
    const lastImg = last.querySelector('.game__img').src;

    if(preImg !== lastImg){
        VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);
        setTimeout(() => {
            pre.classList.remove("active");
            last.classList.remove("active");
        }, 500)
    }

    if(VISIBLE_CARDS.length == CARD_AMOUNT){
        VICTORY_TEXT.classList.add("active")
    }
}

startGame();

const HOME_BTN = document.querySelector("#home-btn");

HOME_BTN.addEventListener('click', goHome);

function goHome() {
  // code to go home here
  window.location.href = "/index.html";
}