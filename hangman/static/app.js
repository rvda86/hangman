
class Game {
    word = ""
    mistakes = 0 
    maxMistakes = 10
    lettersCorrect = []
    gameWon = false
    gui = new GameGUI()

    startGame() {
        this.gui.showGameScreen()
        this.gui.createLettersPlaceholders(this.word)
    }

    setWord(word) {
        word = word.toLowerCase()
        if (!/[^a-z]/.test(word)) this.word = word
    }

    keyPressed(key) {
        this.gui.disableKey(key)
        if (this.word.includes(key)) {
            this.gui.makeKeyGreen(key)            
            this.gui.showCorrectLetter(key, this.word)
            this.lettersCorrect.push(key)
            this.checkIfWon()
        } else {
            this.gui.makeKeyRed(key)
            this.mistakes++
            this.checkIfLost()            
        }
    }

    checkIfLost() {
        if (this.mistakes >= this.maxMistakes) this.gui.showGameOverScreen()
    }

    checkIfWon() {
        for (let letter of this.word) {
            if (!this.lettersCorrect.includes(letter)) return this.gameWon = false
            else this.gameWon = true
        }
        if (this.gameWon) this.gui.showVictoryScreen()
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
        document.getElementById("game-div").style.display = "block";
    }

    showVictoryScreen() {
        document.getElementById("game-div").style.display = "none";
        document.getElementById("game-won").style.display = "block";
    }

    showGameOverScreen() {
        document.getElementById("game-div").style.display = "none";
        document.getElementById("game-over").style.display = "block";
    }

    showEnterWordDiv() {
        document.getElementById("start-div").style.display = "none";
        document.getElementById("enter-word-div").style.display = "block";
    }
}

let gameInstance = new Game

function showEnterWordDiv() {
    gameInstance.gui.showEnterWordDiv()
}

async function startGameAuto() {
    let options = {method: 'GET', headers: {'Content-type': 'application/json'}}
    let api = 'http://192.168.2.2:5000/word'
    let response = await fetch(`${api}`, options)
    let data = response.json()
    data.then(data => gameInstance.setWord(data.word))
    data.then(() => gameInstance.startGame())
}

function startGameManual() {
    let word = document.getElementById("entered-word").value
    gameInstance.setWord(word)
    gameInstance.startGame()
}

function keyPressed(key) {
    gameInstance.keyPressed(key)
}

function reload() {
    location.reload()
}

