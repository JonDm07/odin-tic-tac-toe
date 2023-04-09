const gameBoard = (() => {
    let gameBoardArr = [
        ["X","X","C"], 
        ["O","O","C"],  
        ["X","C","C"]   
    ]
        
    

    const resetBoard = function() {

            gameBoard.gameBoardArr = [
                ["C","C","C"],
                ["C","C","C"],
                ["C","C","C"]
            ]
    }


    return {gameBoardArr, resetBoard}

})();

function player(symbol) {

    function play(x, y) {
        if (gameBoard.gameBoardArr[x][y] !== "O" && gameBoard.gameBoardArr[x][y] !== "X") {
            gameBoard.gameBoardArr[x][y] = symbol 
        }

        console.log(gameBoard.gameBoardArr)
    }  
    return {symbol, play}
}

const algorithm = (function() {

    const humanMark = "O"
    const aiMark ="X"

    const checkIfThereIsWinner = function(currentGameBoardState, mark) {
        let winner;

        if(currentGameBoardState[1][1] === mark && currentGameBoardState[2][0] === mark &&  currentGameBoardState[0][2] === mark) {
            winner = mark
        } else if (currentGameBoardState[1][1] === mark && currentGameBoardState[0][0] === mark &&  currentGameBoardState[2][2] === mark) {
            winner = mark
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
        })(mark);

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


    const minimax = (currentGameBoardState, maximizingPlayer) => {
        let mark;

        if(maximizingPlayer) {
            mark = "X"
        } else {
            mark = "O"
        }
        
        let emptyCellsArray = findEmptyCells(currentGameBoardState)

        

        let humanCheck = checkIfThereIsWinner(currentGameBoardState, humanMark)
        let aiCheck = checkIfThereIsWinner(currentGameBoardState, aiMark)

        if(humanCheck !== undefined || aiCheck !== undefined || emptyCellsArray.length === 0) {
            if(humanCheck) {
                return -1
            } else if(aiCheck) {
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
                    score.push(minimax(newGameBoard, false))
                    

                }
                return Math.max.apply(Math, score)        
            } else{
                for(let i = 0; i < emptyCellsArray.length; i++) {
                    let newGameBoard = JSON.parse(JSON.stringify(currentGameBoardState))
                    newGameBoard[emptyCellsArray[i].row][emptyCellsArray[i].column] = mark
                    score.push(minimax(newGameBoard, true))
                    

                }
                return score
            }
        }        
    }

    return {minimax}

})()

console.log(algorithm.minimax(gameBoard.gameBoardArr, false))