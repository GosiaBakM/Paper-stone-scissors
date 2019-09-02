const optionImages = document.querySelectorAll('div.images img');
const tableOfChooseOptions = ["paper", "stone", "scissors"];

const printedResult = document.querySelector('.finalText');

const singularGame = {
    aISelection: "",
    userSelection: "",
    userWin: false
}

const gameSummary = {
    numberOfGames: 0,
    playerResult: 0,
    AIResult: 0
}

let drawImageByAI = () => {
    if (singularGame.aISelection == "") {
        const randomIndex = Math.floor(Math.random() * tableOfChooseOptions.length);
        singularGame.aISelection = tableOfChooseOptions[randomIndex];
        const AIChosenImage = document.querySelector('.imageAI img');
        AIChosenImage.dataset.status = "show";
        AIChosenImage.src = "images/" + singularGame.aISelection + ".png";
        return singularGame.aISelection;
    }
}

let checkingTheWinner = function () {
    gameSummary.numberOfGames++;
    if (singularGame.aISelection == singularGame.userSelection) {
        printedResult.textContent = "It's a tie";
    } else if ((singularGame.userSelection === "scissors" && singularGame.aISelection == "paper") || (singularGame.userSelection === "paper" && singularGame.aISelection == "stone") || (singularGame.userSelection === "stone" && singularGame.aISelection == "scissors")) {
        printedResult.textContent = "Congrats, you won !!!";
        gameSummary.playerResult++;
    } else {
        printedResult.textContent = "Sorry, you lost. Try  one more time";
        gameSummary.AIResult++;
        return;
    }
}

const countingPoints = function () {
    document.querySelector('.playerResult').textContent = 'Twoja liczba punktów: ' + gameSummary.playerResult;
    document.querySelector('.AIResult').textContent = 'Liczba punktów przeciwnika: ' + gameSummary.AIResult;
    document.querySelector('.gamesQuantity').textContent = 'Gry: ' + gameSummary.numberOfGames;
}


const selectOption = function () {
    optionImages.forEach(function (j) {
        j.setAttribute("data-selection", "notPickedOut")
    });
    this.setAttribute("data-selection", "pickedOut");
    singularGame.userSelection = this.dataset.option;
    drawImageByAI();
    checkingTheWinner();
    countingPoints();
    const playAgainButton = document.querySelector('button.play');
    playAgainButton.dataset.status = "show";
    playAgainButton.addEventListener('click', playAgain);
}

let pickOutOption = function () {
    optionImages.forEach(function (i) {
        i.style.boxShadow = "none";
        i.addEventListener('click', selectOption)
    });
}

let showResultOfPlayers = function () {
    document.querySelector(".imagesNotPicked").className = "imagesPicked";
}

const startGame = function () {
    countingPoints();
    pickOutOption();
}
const playAgain = function () {
    optionImages.forEach(function (j) {
        j.setAttribute("data-selection", "beginPostion");
        printedResult.textContent = "";
    });
    singularGame.aISelection = "";
    document.querySelector(".imageAI img").dataset.status = "notShow";
};
pickOutOption();