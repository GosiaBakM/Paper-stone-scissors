const imagesTable = document.querySelectorAll('div.images img');
const tableOfChooseOptions = ["paper", "stone", "scissors"];
let aISelection;
let userSelection;
const userWin = false;
const printedResult = document.querySelector('.finalText');

let numberOfGames = 0;
let playerResult = 0;
let AIResult = 0;


const drawImageByAI = () => {
    if (aISelection == undefined) {
        const randomIndex = Math.floor(Math.random() * tableOfChooseOptions.length);
        aISelection = tableOfChooseOptions[randomIndex];
        const AIChosenImage = document.createElement('img');
        AIChosenImage.src = "images/" + aISelection + ".png";
        document.querySelector('div.imageAI').appendChild(AIChosenImage);
        return aISelection;
    }
}

let checkingTheWinner = function () {
    numberOfGames++;
    if (aISelection == userSelection) {
        printedResult.textContent = "It's a tie";
    } else if ((userSelection === "scissors" && aISelection == "paper") || (userSelection === "paper" && aISelection == "stone") || (userSelection === "stone" && aISelection == "scissors")) {
        printedResult.textContent = "Congrats, you won !!!";
        playerResult++;
    } else {
        printedResult.textContent = "Sorry, you lost. Try  one more time";
        AIResult++;
        return;
    }
}

const countingPoints = function () {
    // document.querySelector('.playerResult').textContent = "Twoja liczba punktów: ";
    document.querySelector('.playerResult').textContent = 'Twoja liczba punktów: ' + playerResult;
    document.querySelector('.AIResult').textContent = 'Liczba punktów przeciwnika: ' + AIResult;
    document.querySelector('.gamesQuantity').textContent = 'Gry: ' + numberOfGames;
    // resultBlock.textContent = ""
}

let pickOutOption = function () {
    imagesTable.forEach(function (i) {
        i.style.boxShadow = "none";
        i.addEventListener('click', function () {
            imagesTable.forEach((j) => j.setAttribute("data-selection", "notPickedOut"));
            // imagesTable.setAttribute("data-selection", "notPickedOut");
            // this.style.padding = "50px";
            // this.style.borderRadius = "50%";
            // this.style.boxShadow = "0px 0px 30px grey";
            // document.querySelector("h1 + div").className = "notPicked";
            this.setAttribute("data-selection", "pickedOut");
            // showResultOfPlayers();
            console.log("wybrano");
            userSelection = this.getAttribute('src').slice(7, -4);
            drawImageByAI();
            checkingTheWinner();
            countingPoints();
            const playAgainButton = document.createElement('button');
            playAgainButton.className = "play";
            playAgainButton.textContent = "Play again";
            document.querySelector('.result').appendChild(playAgainButton);
        })
    });
}

let showResultOfPlayers = function () {
    document.querySelector(".imagesNotPicked").className = "imagesPicked";
}



countingPoints();
pickOutOption();