let keyboardDiv = document.querySelector(".keyboard")
const hangmanImage = document.querySelector(".hangman-box img")

const wordDisplay = document.querySelector(".word-display")
const guessesText = document.querySelector(".guesses-text b")
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

function resetGame(){
    correctLetter = []
    wrongGuessCount = 0
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    guessesText.innerText = `${wrongGuessCount} / ${maxGuessed}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");

}

let currentWord,correctLetter=[],wrongGuessCount = 0;
const maxGuessed = 6;
const getRandomWord = () => {
    const{word,hint} = wordList[Math.floor(Math.random()*wordList.length)]
    console.log(word);
    currentWord = word
    document.querySelector(".hint-text b").innerHTML = hint
    wordDisplay.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("")
    resetGame()
}

const gameOver = (isVictory)=>{
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word :` : `The Correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Game Over !"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300)
}


const initGame = (button,clickedLetter) =>{
    console.log(button,clickedLetter)
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter){
                correctLetter.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
        console.log(clickedLetter,"is in the word !");

    }else{
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        console.log(clickedLetter,"is not exist in the word");
    }
    button.disabled = true;
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuessed}`;

    if(wrongGuessCount === maxGuessed) return gameOver(false);
    if(correctLetter.length === currentWord.length) return gameOver(true);


}
for (let i = 97; i <=122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button)
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)))
}

getRandomWord();

playAgainBtn.addEventListener("click",getRandomWord)




















































