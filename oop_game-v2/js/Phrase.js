/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor (phrase){
        this.phrase = phrase.toLowerCase();
    }

    //add the displayfields for each character of the phrase
    addPhraseToDisplay(){
        const displayedPhrase = document.querySelector("#phrase ul");
        displayedPhrase.innerHTML= "";
        for (let element of this.phrase){
            const li = document.createElement('li');
            if (element === " ") {
                li.className = "space";
            } else {
                li.className = `hide letter ${element}`;
                li.textContent = element;            
            }
            displayedPhrase.appendChild(li);
        }
    }

    //check if the letter selected corresponds with a letter in the phrase
    checkLetter(letter){
        for (let element of this.phrase){
            if (element === letter) {
                return true;
            }
        }
        return false;
    } 
    //if letter corresponds then display it, if not it should stay hidden
    showMatchedLetter(letter){
        const letters = document.querySelectorAll(`.letter.${letter}`);  
        for (let li of letters){
                li.classList.remove("hide");
                li.classList.add("show");            
        }
    }

}