const spnPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid");

let currentTime = 0;


//quando a janela carregar
window.onload = () => {

    spnPlayer.innerHTML = localStorage.getItem("player")
    startTimer();
    loadGame();

};

// função para iniciar o tempo
const startTimer = () => {


    this.loop = setInterval(() => {

        currentTime++;
        timer.innerHTML = currentTime;

    }, 1000);
};

//array dos personagens das cartas
const characters = [
    "carta1",
    "carta2",
    "carta3",
    "carta4",
    "carta5",
    "carta6",
    "carta7",
    "carta8",
    "carta9",
    "carta10",

];

//dobrando e embaralhando as cartas
const duplicateCharacters = [...characters,...characters];
const shuffledArray = duplicateCharacters.sort(() =>  Math.random() - 0.5);


// função para criar um elemento

const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;

};


// criar as cartas

const createCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front"); 
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('../images/${character}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character)

    return card;

};

// função para carregar o jogo
const loadGame = () => {


    shuffledArray.forEach((character) => {

        const card = createCard(character);

        grid.appendChild(card);

    });
};

//criar variaveis para a primeira e segunda carta
let firstCard = "";
let secondCard = "";



//função para revelar as cartas
const revealCard = ( {target} ) => {

    if (target.parentNode.className.includes("reveal-card")) {

        return;
        
    }


   if (firstCard === "") {

    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
   
   } else if (secondCard === "") {

    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
    
   }
    
};

//função para checar as cartas
const checkCards = () => {

    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        //Quando acertar as cartas
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();

    } else {
        //Quando errar as cartas
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";
        }, 500);
    }
};


//Função para checar o fim do jogo
const checkEndGame = () => {

    clearInterval(this.loop);

    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 2) {

        setTimeout(() => {

            alert("Parabens !!!")
            
        }, 1500);
        
        
    }

};


