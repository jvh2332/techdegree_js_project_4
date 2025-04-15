/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(){
        this.missed = 0;
        this.phrases = [
            new Phrase("Smells like teen spirit"),
            new Phrase("We are the champions"),
            new Phrase("Locked out of heaven"),
            new Phrase("Sign of the times"),
            new Phrase("I write sins not tragedies")
        ];
        this.activePhrase = null;
    }

    startGame(){
        const startOverlay = document.querySelector("#overlay");
        startOverlay.style.display = 'none'; // hide the start overlay screen
        this.resetGame(); //reset the game
        this.activePhrase = this.getRandomPhrase();// call the random phrase
        this.activePhrase.addPhraseToDisplay(); // display the random phrase
    }

    //get a random phrase from the phrases property
    getRandomPhrase(){
        const randomPhrase = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhrase];
    }

    //check if the player has found all the letters
    checkForWin(){
        const letters = document.querySelectorAll("#phrase li");
        for (let li of letters) {
            if (li.classList.contains("hide")) {
                return false;
            }
        }
        return true;
    }

    //remove a life if the player guessed a wrong letter
    removeLife(){
        const hearts = document.querySelectorAll(".tries img");
        if (this.missed < 5){
            hearts[this.missed].src = "images/lostHeart.png";
        }
        this.missed++;

        if (this.missed === 5){
            this.gameOver();
        }
    }

    //show the right message when the game is over
    gameOver(){
        const startOverlay = document.querySelector("#overlay");
        const gameOverMessage = document.querySelector("#game-over-message");
        
        startOverlay.style.display = 'block'; //show the start overlay screen again

        if (this.checkForWin()){
            startOverlay.classList.remove("start");
            startOverlay.classList.add("win");
            gameOverMessage.textContent=`Congratulations, you won!`;
        } else {
            startOverlay.classList.remove("start");
            startOverlay.classList.add("lose");
            gameOverMessage.textContent = `Sorry, you lost. Try again!`;
        }
    }

    handleInteraction(button){
        const guessedLetter = button.textContent;
        button.disabled = true;
        if (this.activePhrase.checkLetter(guessedLetter)){
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(guessedLetter);
            if (this.checkForWin()) {
                this.gameOver();
            }        
        } else {
            button.classList.add("wrong");
            this.removeLife();
        }
    }

    resetGame(){
        const displayedPhrase = document.querySelector("#phrase ul");
        displayedPhrase.innerHTML= ""; //remove the 'li' elements from Phrase ul

        const startOverlay = document.querySelector("#overlay");
        startOverlay.classList.remove("win", "lose"); //remove win or lose class from overlay

        //re-enable keyboard buttons
        const keyboardButtons = document.querySelectorAll(".key");
        keyboardButtons.forEach(button =>{
            button.disabled = false;
            button.classList.remove("chosen", "wrong");
        });

        this.missed = 0 //reset missed guesses to 0
        //reset all hearts to live hearts
        const hearts = document.querySelectorAll(".tries img");
        hearts.forEach(heart => {
            heart.src = "images/liveHeart.png";
        }); 
    }

}