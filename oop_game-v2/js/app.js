/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = "";
const startButton = document.querySelector("#btn__reset");

//when start button is click, a new game should be launched
startButton.addEventListener("click", (e) => {
    game = new Game();
    game.startGame();
});

const keyboardButtons = document.querySelectorAll(".key");

//when keyboard button is clicked, run the handleInteraction() method to check if the letter is present in the activePhrase
keyboardButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        game.handleInteraction(e.target);
    });
});



