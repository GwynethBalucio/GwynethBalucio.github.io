var count = 0;
var displayCount = document.getElementById("score");
var modal = document.getElementById("modalInfo");
var icon = document.getElementById("info-icon");
var span = document.getElementsByClassName("close")[0];
var refreshbutton = document.getElementById("oafter-btn");

class AudioController {
    constructor() {
        this.flipSound = new Audio('assets/audio/flip.mp3')
        this.matchSound = new Audio('assets/audio/0_m.mp3')
        this.gameOverSound = new Audio('assets/audio/gameover.wav')
        this.victorySound = new Audio('assets/audio/victory.wav')
    }

    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }

    gameover_sound() {
        this.gameOverSound.play();
    }

    victory_sound() {
        this.victorySound.play();
    }
}

class gengame {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.cardtoCheck = null;
        this.totalClicks = 0;
        this.timeRemaining= this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountdown();
            this.busy = false;
        }, 500);

        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
        });
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText=this.totalClicks;
            card.classList.add('visible');

            if(this.cardtoCheck)
                this.checkMatch(card);
            else
                this.cardtoCheck = card;
        }
    }

    checkMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardtoCheck))
            this.cardMatch(card, this.cardtoCheck);
        else
            this.misMatch(card, this.cardtoCheck);

        this.cardtoCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1)
        this.matchedCards.push(card2)
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
        count+=75;
        displayCount.innerHTML = count;
    }

    misMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
        count-=25;
        displayCount.innerHTML = count;
        if(count < 0)
            count = 0;    
            displayCount.innerHTML = count
            
    }

    getCardType(card) {
        return card.getElementsByClassName('cvalue')[0].src;
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0) 
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over').classList.add('visible');
        addImage();
        appendButton();
        appendButton1();
        this.audioController.gameover_sound();
    }

    victory() {
        clearInterval(this.countDown);
        document.getElementById('victory').classList.add('visible');
        addImage1();
        this.addText();
        appendButton();
        appendButton1()
        this.audioController.victory_sound();
        saveScore();

    }

    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i>0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardtoCheck;
    }

    addText() {
        var score = count + 75;
        let text = document.getElementById("oafter-text");
        text.innerHTML = 'Your Score: ' +  score;
    }
}

function removeImage() {
    var remove = document.getElementById('imgotext');
    remove.parentNode.removeChild(remove);
}

function addImage() {
    var img = document.createElement('img');
    img.src="assets/0_go.png";
    var src = document.getElementById("game-over-screen");

    src.appendChild(img);
}

function addImage1() {
    var img = document.createElement('img');
    img.src="assets/0_v.png";
    var src = document.getElementById("victory-screen");

    src.appendChild(img);
}

function appendButton() {
    var img = document.createElement('img');
    img.src="assets/0_btn.png";
    var image = document.getElementById("oafter-btn");
    image.appendChild(img);
}

function appendButton1() {
    var img1 = document.createElement('img');
    img1.src="assets/0_btn1.png";
    var image1 = document.getElementById("oafter-btn1");

    image1.appendChild(img1);
}

function saveScore() {
    var scoreCount, scoreInfo, fileJSON;
    
    scoreCount = count + 75;

    scoreInfo = {level: "8x8", score: scoreCount};
    fileJSON = JSON.stringify(scoreInfo);
    localStorage.setItem("score8JSON", fileJSON);
    console.log('score: ' + scoreCount);

    localStorage.setItem("saveScore", scoreCount);
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-c2s"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new gengame(400, cards);
    
    overlays.forEach( overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            removeImage();
            game.startGame();
        })
    })

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card)
        })
    })
}

if(document.readyState ==="loading"){
    document.addEventListener('DOMContentLoaded', ready());
}

else {
    ready();
}


icon.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

refreshbutton.onclick = function() {
    location.reload();
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}