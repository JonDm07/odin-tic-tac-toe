const gameBoard = (() => {
    let gameBoardArr = [
        ["C1","C2","C3"],
        ["C4","C5","C6"],
        ["C7","C8","C9"]
    ]
    
    const boxes = Array.from(document.querySelectorAll(".box"))

    const clickListener = function() {

        boxes.forEach(box => {
            box.addEventListener("click", () => {
                
                let x = box.getAttribute("data-x")
                let y = box.getAttribute("data-y")

                if(gameController.turn % 2 === 1 && gameBoard.gameBoardArr[x][y] !== "X" && gameBoard.gameBoardArr[x][y] !== "O" && gameController.winner === undefined) {
                    player1.play(x, y)
                    box.textContent = "X"
                    turnDisplay.render()
                    
                } else if (gameController.turn % 2 === 0 && gameBoard.gameBoardArr[x][y] !== "X" && gameBoard.gameBoardArr[x][y] !== "O" && gameController.winner === undefined){
                    player2.play(x, y)
                    box.textContent = "O"
                    turnDisplay.render()
                }
            })  
        })
    }

    const resetBoard = function() {
        const resetButton = document.querySelector(".reset")

        resetButton.addEventListener("click", () => {
            gameBoard.gameBoardArr = [
                ["C1","C2","C3"],
                ["C4","C5","C6"],
                ["C7","C8","C9"]
            ]

            gameController.turn = 1
            gameController.winner = undefined

            boxes.forEach(box => {
                box.textContent = ""
            })

            turnDisplay.render() 

        })
    }

    clickListener()
    resetBoard()

    return {gameBoardArr}

})();

const gameController = (() => {

    let turn = 1
    let winner;

    const evaluateRow = function() {
        for(let i = 0; i < 3; i++) {

            let arrX = []
            let arrO = []

            for(let j = 0; j < 3; j++) {
                if(gameBoard.gameBoardArr[i][j] === "X") {
                    arrX.push(gameBoard.gameBoardArr[i][j])
                } else if (gameBoard.gameBoardArr[i][j] === "O") {
                    arrO.push(gameBoard.gameBoardArr[i][j])
                }                
            }

            if(arrX.length === 3) {
                alert("X won, row")
                gameController.winner = "X"
            } else if ( arrO.length === 3) {
                alert("O won, row")
                gameController.winner = "O"
            }
        }
    }

    const evaluateColumn = function() {
        for(let i = 0; i < 3; i++) {

            let arrX = []
            let arrO = []

            for(let j = 0; j < 3; j++) {
                if(gameBoard.gameBoardArr[j][i] === "X") {
                    arrX.push(gameBoard.gameBoardArr[j][i])
                } else if (gameBoard.gameBoardArr[j][i] === "O") {
                    arrO.push(gameBoard.gameBoardArr[j][i])
                }                
            }

            if(arrX.length === 3) {
                alert("X won, column")
                gameController.winner = "X"
            } else if ( arrO.length === 3) {
                alert("O won, column")
                gameController.winner = "O"
            }
        }
    }

    const evaluateDiagonal = function() {
        let centerSymbol = gameBoard.gameBoardArr[1][1]      

            let arrX = []
            let arrO = []

            if (gameBoard.gameBoardArr[2][0] === centerSymbol) {
                if(centerSymbol === "X") {
                    arrX.push(gameBoard.gameBoardArr[2][0])
                } else {
                    arrO.push(gameBoard.gameBoardArr[2][0])
                }
            }
            
            if(gameBoard.gameBoardArr[0][2] === centerSymbol){
                if(centerSymbol === "X") {
                    arrX.push(gameBoard.gameBoardArr[0][2])
                } else {
                    arrO.push(gameBoard.gameBoardArr[0][2])
                }
            }
            
            let arrXTwo = []
            let arrOTwo = []

            if (gameBoard.gameBoardArr[0][0] === centerSymbol) {
                if(centerSymbol === "X") {
                    arrXTwo.push(gameBoard.gameBoardArr[2][0])
                } else {
                    arrOTwo.push(gameBoard.gameBoardArr[2][0])
                }
            }
            
            if(gameBoard.gameBoardArr[2][2] === centerSymbol){
                if(centerSymbol === "X") {
                    arrXTwo.push(gameBoard.gameBoardArr[0][2])
                } else {
                    arrOTwo.push(gameBoard.gameBoardArr[0][2])
                }
            }

            if (arrX.length === 2) {
                alert("X won, diagonal")
                gameController.winner = "X"
            } else if (arrO.length === 2) {
                alert("O won, diagonal")
                gameController.winner = "O"
            } else if (arrXTwo.length === 2) {
                alert("X won, diagonal")
                gameController.winner = "X"
            } else if (arrOTwo.length === 2) {
                alert("O won, diagonal")
                gameController.winner = "O"
            }


    }

    const evaluateTie = function() {
        if(gameController.turn === 10 && gameController.winner === undefined) {
            alert("Tie")
        }
    }   

    return {evaluateRow, evaluateColumn, evaluateDiagonal, evaluateTie, turn, winner}

})();

const turnDisplay = (function() {
    const turnDisplay = document.querySelector(".turn-display")
    const render = function() {
        if(gameController.turn % 2 === 1) {
            turnDisplay.textContent = `Turn: X  ${gameController.turn}`
        } else {
            turnDisplay.textContent = `Turn: O  ${gameController.turn}`
        }
    }

    

    return {render}

})();



function player(symbol) {

    let x;
    let y;

    function play(x, y) {
        if (gameBoard.gameBoardArr[x][y] !== "O" && gameBoard.gameBoardArr[x][y] !== "X") {
            gameBoard.gameBoardArr[x][y] = symbol
            gameController.evaluateRow()
            gameController.evaluateColumn()
            gameController.evaluateDiagonal()
            gameController.turn++
            gameController.evaluateTie()
        }
    }

    return {symbol, x, y, play}
}

const player1 = Object.create(player("X"))
const player2 = Object.create(player("O"))

player2.getXandY = function() {
    this.x = Math.floor(Math.random() * 3)
    this.y = Math.floor(Math.random() * 3)
}

