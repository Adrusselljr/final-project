// Set Query Params
const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

const difficulty = params.difficulty

// Query elements
const board = $("#board")
const message = $("#text")

// Set variables
let cardOne
let firstClick
let cardTwo
let turn = 0
let matchCount = 0
let cardNum

// Setup sounds
const cardFlip = new Audio('./sounds/cardFlip.ogg')
const cardShuffle = new Audio('./sounds/cardShuffle.wav')
const correct = new Audio('./sounds/correct.wav')

// Create board based on difficulty
if(difficulty === "easy") {
    for(let i = 0; i < 8; i++) {
        const layout = $(`<div class="card"><img id="${i}" class="cardImg" src="./images/cardBack.jpeg" alt="Card Back"></div>`)
        board.append(layout)
    }
}

if(difficulty === "medium") {
    for(let i = 0; i < 12; i++) {
        const layout = $(`<div class="card"><img id="${i}" class="cardImg" src="./images/cardBack.jpeg" alt="Card Back"></div>`)
        board.append(layout)
    }
}

if(difficulty === "hard") {
    for(let i = 0; i < 16; i++) {
        const layout = $(`<div class="card"><img id="${i}" class="cardImg" src="./images/cardBack.jpeg" alt="Card Back"></div>`)
        board.append(layout)
    }
}

// Reset board
const card = $(".cardImg")

const reset = () => {

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

// Get card values
if(difficulty === "easy") {
    cardNum = [1, 1, 2, 2, 3, 3, 4, 4]
}

if(difficulty === "medium") {
    cardNum = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
}

if(difficulty === "hard") {
    cardNum = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
}

cardNum = _.shuffle(cardNum)
cardShuffle.play()

// Set up click listener
const oneCard = $(".card")

board.on('click', e => {

    const index = $(e.target).attr("id")

    // Set clicked card image
    if(cardNum[index] === 1) {
        $(e.target).attr("src", "./images/ace.jpg")
        cardFlip.play()
    }
    if(cardNum[index] === 2) {
        $(e.target).attr("src", "./images/king.png")
        cardFlip.play()
    }
    if(cardNum[index] === 3) {
        $(e.target).attr("src", "./images/queen.png")
        cardFlip.play()
    }
    if(cardNum[index] === 4) {
        $(e.target).attr("src", "./images/jack.png")
        cardFlip.play()
    }
    if(cardNum[index] === 5) {
        $(e.target).attr("src", "./images/ten.png")
        cardFlip.play()
    }
    if(cardNum[index] === 6) {
        $(e.target).attr("src", "./images/nine.png")
        cardFlip.play()
    }
    if(cardNum[index] === 7) {
        $(e.target).attr("src", "./images/eight.png")
        cardFlip.play()
    }
    if(cardNum[index] === 8) {
        $(e.target).attr("src", "./images/seven.png")
        cardFlip.play()
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
                $(e.target).attr("src", "./images/cardBack.jpeg")
                cardFlip.play()
                console.log("dont match")

            }

        }, 500)

        turn = 0

    }

})