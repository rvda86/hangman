class Game {

    constructor(api) {
        this.api = api
    }

    data = {}
    mistakes = 0 
    maxMistakes = 10
    lettersCorrect = []
    gameWon = false
    gui = new GameGUI()

    startGame() {
        this.gui.showGameScreen()
        this.gui.createLettersPlaceholders(this.data.word)
    }

    setWord(word) {
        word = word.toLowerCase()
        if (/^[a-zA-Z]+$/.test(word)) {
            this.data.word = word
            this.startGame()
        } else {
            this.gui.showEnteredWordFeedback(word)
        }  
    }

    setData(data) {
        this.data = data
    }

    keyPressed(key) {
        this.gui.disableKey(key)
        if (this.data.word.includes(key)) {
            this.gui.makeKeyGreen(key)            
            this.gui.showCorrectLetter(key, this.data.word)
            this.lettersCorrect.push(key)
            this.checkIfWon()
        } else {
            this.gui.makeKeyRed(key)
            this.mistakes++
            this.gui.updateGallow(this.mistakes)
            this.checkIfLost()           

        }
    }

    checkIfLost() {
        if (this.mistakes >= this.maxMistakes) {
            this.gui.showGameFinishedScreen(this.data.word, false)
            }
        }

    checkIfWon() {
        for (let letter of this.data.word) {
            if (!this.lettersCorrect.includes(letter)) return this.gameWon = false
            else this.gameWon = true
        }
        if (this.gameWon) {
            this.gui.showGameFinishedScreen(this.data.word, true)
        }
    }
}

class GameGUI {
    
    createLettersPlaceholders(word) {
        for (let i = 0; i < word.length; i++) {
            let li = document.createElement('li');
            li.classList.add("letter-li");
            li.setAttribute('id', i)
            document.getElementById("letters").appendChild(li);
        }
    }

    showCorrectLetter(key, word) {
        let index = 0;
        for (let letter of word) {
            if (key === letter) document.getElementById(index).innerHTML = key
            index++
        }
    }

    updateGallow(mistakes) {
        const gallow = document.getElementById("gallow")
        gallow.setAttribute("src", `../static/gallow${mistakes}.svg` )
    }

    makeKeyGreen(key) {
        document.getElementById(key).style.backgroundColor = "green"
    }

    makeKeyRed(key) {
        document.getElementById(key).style.backgroundColor = "red"
    }

    disableKey(key) {
        document.getElementById(key).onclick = null
    }

    showGameScreen() {
        document.getElementById("start-div").style.display = "none";
        document.getElementById("enter-word-div").style.display = "none";
        document.getElementById("entered-word-feedback").innerHTML= "";
        document.getElementById("game-div").style.display = "flex";
    }
    showGameFinishedScreen(word, won) {
        document.getElementById("letters-keyboard").style.display = "none";
        document.getElementById("game-finished").style.display = "block";
        document.getElementById("game-finished-word").innerHTML = `The word was "${word}"`
        document.getElementById("game-finished-header").innerHTML = (won) ? 'Congratulations! You won!' : 'Game Over'
    }
    showEnterWordDiv() {
        document.getElementById("start-div").style.display = "none";
        document.getElementById("enter-word-div").style.display = "block";
        document.getElementById("entered-word-feedback").innerHTML= "";
    }
    showEnteredWordFeedback(word) {
        document.getElementById("entered-word-feedback").innerHTML = (word.length == 0) ? "Please enter a word" : "Please enter letters only";
    }
}

let gameInstance = new Game(`${location.href}word`)

function showEnterWordDiv() {
    gameInstance.gui.showEnterWordDiv()
}

async function startGameAuto() {
    let options = {method: 'GET', headers: {'Content-type': 'application/json'}}
    let response = await fetch(`${gameInstance.api}`, options)
    let data = response.json()
    data.then(data => gameInstance.setData(data))
    data.then(() => gameInstance.startGame())
}

function startGameManual() {
    let word = document.getElementById("entered-word").value
    gameInstance.setWord(word)
}

function keyPressed(key) {
    gameInstance.keyPressed(key)
}

function reload() {
    location.reload()
}

