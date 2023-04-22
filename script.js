const gameBoard = (() => {
    let gameBoardArr = [
        ["C","C","C"],
        ["C","C","C"],
        ["C","C","C"]   
    ]
        
    const boxes = Array.from(document.querySelectorAll(".game-tile"))

    const resetBoard = (function() {
            const resetButton = document.querySelector(".reset")


            resetButton.addEventListener("click", () => {
                gameBoard.gameBoardArr = [
                    ["C","C","C"],
                    ["C","C","C"],
                    ["C","C","C"]
                ]

                emptyCellsArray = algorithm.findEmptyCells(gameBoard.gameBoardArr)

                boxes.forEach(box => {
                    box.textContent = ""
                })

                player1.symbol = undefined
                buttons.form.style.display = "block"
                render()
            })    

    })()

    // eslint-disable-next-line no-unused-vars
    const tilesListener = (function() {
        boxes.forEach(box => {
            box.addEventListener("click", () => {
                player1.play(box.getAttribute("data-row"), box.getAttribute("data-column"))
                let winner = algorithm.checkIfThereIsWinner(gameBoard.gameBoardArr)
                algorithm.alertWinner(winner)
                render()

            })
        })
    })();

    const render = function() {
        boxes.forEach(box => {
            if(gameBoard.gameBoardArr[box.getAttribute("data-row")][box.getAttribute("data-column")] === "X") {
                box.classList.add("button-close")
            } else if(gameBoard.gameBoardArr[box.getAttribute("data-row")][box.getAttribute("data-column")] === "O") {
                box.classList.add("button-circle")
            }
            
            if(gameBoard.gameBoardArr[box.getAttribute("data-row")][box.getAttribute("data-column")] === "C") {
                box.classList.remove("button-circle")
                box.classList.remove("button-close")
            }
        })
    }

    return {gameBoardArr, resetBoard, render}

})();

const algorithm = (function() {

    const alertWinner = function(x) {
        if(x) {
            alert(x)
        } else if (!x && emptyCellsArray.length === 0) {
            alert("Draw")
        }
    }

    const checkIfThereIsWinner = function(currentGameBoardState) {
        let winner;
        const mark = ["X", "O"]
    
        for(let i = 0; i < mark.length; i++) {
            if(currentGameBoardState[1][1] === mark[i] && currentGameBoardState[2][0] === mark[i] &&  currentGameBoardState[0][2] === mark[i]) {
                winner = mark[i]
            } else if (currentGameBoardState[1][1] === mark[i] && currentGameBoardState[0][0] === mark[i] &&  currentGameBoardState[2][2] === mark[i]) {
                winner = mark[i]
            }
        
            (function loopThroughBoard(mark) {
                
                let currentRowOrColumn = []
        
                for(let i = 0; i < 3; i++) {
        
                    currentRowOrColumn = []
        
                    for(let j = 0; j < 3; j++) {
                        if(currentGameBoardState[i][j] === mark) {
                            currentRowOrColumn.push(currentGameBoardState[i][j])
                        }
                    }
        
                    if(currentRowOrColumn.length === 3) {
                        winner = mark
                        break
                    }
        
                    currentRowOrColumn = []
        
                    for (let l = 0; l < 3; l++) {
                        if(currentGameBoardState[l][i] === mark) {
                            currentRowOrColumn.push(currentGameBoardState[l][i])
                        }
                    }
        
                    if(currentRowOrColumn.length === 3) {
                        winner = mark
                        break
                    }
                }
            })(mark[i]);
        }
        return winner    
    }

    const findEmptyCells = function(currentGameBoardState) {
        let emptyCellsArray = []
        for(let i = 0; i < 3; i++){
            for(let j = 0; j <3; j++) {
                if(currentGameBoardState[i][j] === "C") {
                    let emptyCell = {
                        row: i,
                        column: j,
                        score: undefined
                    }

                    emptyCellsArray.push(emptyCell)
                }          
            }
        }

        return emptyCellsArray
    }




    const minimax = (currentGameBoardState, maximizingPlayer, emptyCellsArray) => {
        let mark;

        if(maximizingPlayer) {
            mark = "X"
        } else {
            mark = "O"
        }


        let winner = checkIfThereIsWinner(currentGameBoardState)


        if(winner === "X" || winner === "O" || emptyCellsArray.length === 0) {
            if(winner === "O") {
                return -1
            } else if(winner === "X") {
                return 1 
            } else {
                return 0
            }
        } else {
            let score = []
            if(maximizingPlayer) {
                for(let i = 0; i < emptyCellsArray.length; i++) {
                    let newGameBoard = JSON.parse(JSON.stringify(currentGameBoardState))
                    newGameBoard[emptyCellsArray[i].row][emptyCellsArray[i].column] = mark
                    let newEmptyCells = findEmptyCells(newGameBoard) 
                    score.push(minimax(newGameBoard, false, newEmptyCells))
                    emptyCellsArray[i].score = score[i]               
                }


                return Math.max.apply(Math, score)

            } else{
                for(let i = 0; i < emptyCellsArray.length; i++) {
                    let newGameBoard = JSON.parse(JSON.stringify(currentGameBoardState))
                    newGameBoard[emptyCellsArray[i].row][emptyCellsArray[i].column] = mark
                    let newEmptyCells = findEmptyCells(newGameBoard)
                    score.push(minimax(newGameBoard, true, newEmptyCells))
                    emptyCellsArray[i].score = score[i]                    
                }
                
                return Math.min.apply(Math, score)

            }
        }        
    }

    return {minimax, findEmptyCells, checkIfThereIsWinner, alertWinner}

})()



function player() {

    const play = function (x, y) {

        let winner = algorithm.checkIfThereIsWinner(gameBoard.gameBoardArr)

        if(!winner && emptyCellsArray.length !== 0) {

            if (gameBoard.gameBoardArr[x][y] !== "O" && gameBoard.gameBoardArr[x][y] !== "X") {
                gameBoard.gameBoardArr[x][y] = this.symbol
                winner = algorithm.checkIfThereIsWinner(gameBoard.gameBoardArr)            
                emptyCellsArray = algorithm.findEmptyCells(gameBoard.gameBoardArr)               

                if(emptyCellsArray.length !== 0) {

                    let aiMove;

                    if(this.symbol === "X") {
                        aiMove = algorithm.minimax(gameBoard.gameBoardArr, false, emptyCellsArray)
                    } else if(this.symbol === "O") {
                        aiMove = algorithm.minimax(gameBoard.gameBoardArr, true, emptyCellsArray)
                    }

                
                    let possibleMoves = emptyCellsArray.filter(el => el.score === aiMove)

                    if(this.symbol === "X") {
                        gameBoard.gameBoardArr[possibleMoves[0].row][possibleMoves[0].column] = "O"
                        emptyCellsArray = algorithm.findEmptyCells(gameBoard.gameBoardArr)
                        winner = algorithm.checkIfThereIsWinner(gameBoard.gameBoardArr)
                        console.log(emptyCellsArray)

                        
                    } else {
                        gameBoard.gameBoardArr[possibleMoves[0].row][possibleMoves[0].column] = "X"
                        emptyCellsArray = algorithm.findEmptyCells(gameBoard.gameBoardArr)
                        winner = algorithm.checkIfThereIsWinner(gameBoard.gameBoardArr)
                    }
                }                
            }
        }
    }
         
    return {play}
}

let emptyCellsArray = algorithm.findEmptyCells(gameBoard.gameBoardArr)

const player1 = Object.create(player())

const buttons = (function() {

    const submitButton = document.querySelector("#submit")
    const form = document.querySelector(".player-info")

    submitButton.addEventListener("click", (e) => {
        e.preventDefault()

        const checkedRadioButton = document.querySelector("input[name='symbol']:checked").value        

        player1.symbol = checkedRadioButton
        form.style.display = "none"

        if(player1.symbol === "O") {
            let aiMove = Math.floor(Math.random() * 10)
        
            gameBoard.gameBoardArr[emptyCellsArray[aiMove].row][emptyCellsArray[aiMove].column] = "X"
            gameBoard.render()
        
            emptyCellsArray = algorithm.findEmptyCells(gameBoard.gameBoardArr)
            player.winner = algorithm.checkIfThereIsWinner(gameBoard.gameBoardArr)
        }

    })

    return{submitButton, form}
})()


