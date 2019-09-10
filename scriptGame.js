const imagesOfAllOptions = document.querySelectorAll('div.images img');
const tableOfImagesNames = ["paper", "stone", "scissors"];

const singularGame = {
    aISelection: "",
    playerSelection: "",
    playerVictory: false
}
const gameSummary = {
    numberOfGames: 0,
    playerResult: 0,
    AIResult: 0
}

const annoucmentOfResult = document.querySelector('.annoucmentOfResult');

const drawImageByAI = () => {
    if (singularGame.aISelection == "") {
        const randomImagesTableIndex = Math.floor(Math.random() * tableOfImagesNames.length);
        singularGame.aISelection = tableOfImagesNames[randomImagesTableIndex];
        const AIChoosenImage = document.querySelector('.imageAI img');
        AIChoosenImage.dataset.status = "show";
        AIChoosenImage.src = "images/" + singularGame.aISelection + ".png";
        //???
        return singularGame.aISelection;
    }
}

const changeStatusOfSelectedItem = function () {
    imagesOfAllOptions.forEach(function (j) {
        j.setAttribute("data-selection", "notPickedOut")
    });
    this.setAttribute("data-selection", "pickedOut");
    singularGame.playerSelection = this.dataset.option;
    showAfterPlayerClicking();
    drawImageByAI();
}

let getUserChoice = function () {
    imagesOfAllOptions.forEach(function (i) {
        // i.style.boxShadow = "none";
        i.addEventListener('click', changeStatusOfSelectedItem);
    });
}

let checkTheWinner = function () {
    gameSummary.numberOfGames++;
    if (singularGame.aISelection == singularGame.playerSelection) {
        annoucmentOfResult.textContent = "It's a tie";
    } else if ((singularGame.playerSelection === "scissors" && singularGame.aISelection == "paper") || (singularGame.playerSelection === "paper" && singularGame.aISelection == "stone") || (singularGame.playerSelection === "stone" && singularGame.aISelection == "scissors")) {
        annoucmentOfResult.textContent = "Congrats, you won !!!";
        gameSummary.playerResult++;
    } else {
        annoucmentOfResult.textContent = "Sorry, you lost. Try  one more time";
        gameSummary.AIResult++;
    }
}

//ok
const updateDiplayedResults = function () {
    document.querySelector('.playerResult').textContent = 'Player score: ' + gameSummary.playerResult;
    document.querySelector('.AIResult').textContent = 'IA score: ' + gameSummary.AIResult;
    document.querySelector('.gamesQuantity').textContent = 'Number of games: ' + gameSummary.numberOfGames;
}

const playAgain = function () {
    imagesOfAllOptions.forEach(function (j) {
        j.setAttribute("data-selection", "beginPosition"); //notPickedOut
        annoucmentOfResult.textContent = "";
    });
    singularGame.aISelection = "";
    document.querySelector(".imageAI img").dataset.status = "notShow";
    playAgainButton.dataset.status = "notShow";
};

//ok
const displayPlayAgainButton = function () {
    const playAgainButton = document.querySelector('button.play');
    playAgainButton.dataset.status = "show";
    playAgainButton.addEventListener('click', playAgain);
}

// let showResultOfPlayers = function () {
//     document.querySelector(".imagesNotPicked").className = "imagesPicked";
// }

const showAfterPlayerClicking = function () {
    checkTheWinner();
    updateDiplayedResults();
    displayPlayAgainButton();
}

const gameStart = function () {
    getUserChoice();

}

gameStart();