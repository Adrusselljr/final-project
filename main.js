// Set Query Params
const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

const difficulty = params.difficulty

// Query elements
const board = $("#board")
const message = $("#text")
const countDown = $("#countDown")

// Set variables
let cardOne
let firstClick
let cardTwo
let turn = 0
let matchCount = 0
let countDownNum
let cardNum

// Setup sounds
const cardFlip = new Audio('./sounds/cardFlip.ogg')
const cardShuffle = new Audio('./sounds/cardShuffle.wav')
const correct = new Audio('./sounds/correct.wav')

// CoountDownNum helper
const countDownHelper = num => {
    countDownNum = num
    countDown.text(`YOU HAVE ${countDownNum} MOVES LEFT!`)
}

// Helper funtion
const boardBulider = num => {
    for(let i = 0; i < num; i++) {
        const layout = $(`
        <div class="card">
            <img id="${i}" class="cardImg" src="./images/cardBack.jpeg" alt="Card Back"></img>
        </div>
        `)
        board.append(layout)
    }
}

// Get card values
if(difficulty === "easy") {
    cardNum = [1, 1, 2, 2, 3, 3, 4, 4]
    countDownHelper(13)
}

if(difficulty === "medium") {
    cardNum = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
    countDownHelper(19)
}

if(difficulty === "hard") {
    cardNum = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    countDownHelper(23)
}

cardNum = _.shuffle(cardNum)

// Create board based on difficulty
setTimeout(() => {

    if(difficulty === "easy") {
        boardBulider(8)
    }
    
    if(difficulty === "medium") {
        boardBulider(12)
    }
    
    if(difficulty === "hard") {
        boardBulider(16)
    }

    cardShuffle.play()

}, 250)

// Reset board
const reset = () => {

    const card = $(".cardImg")

    if(countDownNum === 0) {
        const loser = $("<h3 id='winMessage'>YOU LOSE!</h3>")
        message.append(loser)
        setTimeout(() => {
            loser.remove()
            card.attr("src", "./images/cardBack.jpeg")
            matchCount = 0
            cardNum = _.shuffle(cardNum)
            cardShuffle.play()
        }, 2000)
    }
    else {
        const winner = $("<h3 id='winMessage'>YOU WON!</h3>")
        message.append(winner)
        setTimeout(() => {
            winner.remove()
            card.attr("src", "./images/cardBack.jpeg")
            matchCount = 0
            cardNum = _.shuffle(cardNum)
            cardShuffle.play()
        }, 2000)
    }

    setTimeout(() => {
        if(difficulty === "easy") {
            countDownHelper(13)
        }
        
        if(difficulty === "medium") {
            countDownHelper(19)
        }
        
        if(difficulty === "hard") {
            countDownHelper(23)
        }
    }, 2000)

}

// Setup onClick for board
board.on('click', e => {

    // Set card values based on id
    const index = $(e.target).attr("id")

    // Play sound
    cardFlip.play()

    // Set clicked card image
    if(cardNum[index] === 1) {
        $(e.target).attr("src", "./images/ace.jpg")
        $(e.target).attr("alt", "Ace of Clubs")
    }
    if(cardNum[index] === 2) {
        $(e.target).attr("src", "./images/king.png")
        $(e.target).attr("alt", "King of Hearts")
    }
    if(cardNum[index] === 3) {
        $(e.target).attr("src", "./images/queen.png")
        $(e.target).attr("alt", "Queen of Diamonds")
    }
    if(cardNum[index] === 4) {
        $(e.target).attr("src", "./images/jack.png")
        $(e.target).attr("alt", "Jack of Spades")
    }
    if(cardNum[index] === 5) {
        $(e.target).attr("src", "./images/ten.png")
        $(e.target).attr("alt", "Ten of Spades")
    }
    if(cardNum[index] === 6) {
        $(e.target).attr("src", "./images/nine.png")
        $(e.target).attr("alt", "Nine of Hearts")
    }
    if(cardNum[index] === 7) {
        $(e.target).attr("src", "./images/eight.png")
        $(e.target).attr("alt", "Eight of Spades")
    }
    if(cardNum[index] === 8) {
        $(e.target).attr("src", "./images/seven.png")
        $(e.target).attr("alt", "Seven of Diamonds")
    }

    // Update countDownNum each click 
    countDownNum--
    countDown.text(`YOU HAVE ${countDownNum} MOVES LEFT!`)
    if(countDownNum === 0) {
        reset()
    }


    // Check if cards match or not
    if(turn === 0) {

        firstClick = $(e.target)
        cardOne = cardNum[index]
        turn++

    }
    else if(turn === 1) {

        cardTwo = cardNum[index]

        setTimeout(() => {

            if(cardOne === cardTwo) {

                correct.play()

                matchCount++

                if(matchCount === 4) {
                    reset()
                }
                if(matchCount === 6) {
                    reset()
                }
                if(matchCount === 8) {
                    reset()
                }

                console.log("match")

            }
            else {

                firstClick.attr("src", "./images/cardBack.jpeg")
                firstClick.attr("alt", "Card Back")
                $(e.target).attr("src", "./images/cardBack.jpeg")
                $(e.target).attr("alt", "Card Back")
                cardFlip.play()
                console.log("dont match")

            }

        }, 500)

        turn = 0

    }

})