const gameBoard = (() => {
    let gameBoardArr = [
        ["C1","C2","C3"],
        ["C4","C5","C6"],
        ["C7","C8","C9"]
    ]

    return {gameBoardArr}

})();

function player(name) {
    function play(x, y, symbol) {
        if (gameBoard.gameBoardArr[x][y] !== "O" && gameBoard.gameBoardArr[x][y] !== "X") {
            gameBoard.gameBoardArr[x][y] = symbol
            evaluateRow()
            evaluateColumn()
        }
    }

    return {name, play}
}

const player1 = player("J")



const gameController = (() => {
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

            if(arrX.length === 3 || arrO.length === 3) {
                alert(`WTF it happened X:${arrX.length} O:${arrO.length}`)
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

            if(arrX.length === 3 || arrO.length === 3) {
                alert(`WTF it happened X:${arrX.length} O:${arrO.length}`)
            }

            console.log(arrX)
            console.log(arrO)
            console.log(gameBoard.gameBoardArr)
        }

    }

/*     const play1 = (x, y) => {
        if (gameBoard.gameBoardArr[x][y] !== "O" && gameBoard.gameBoardArr[x][y] !== "X") {
            gameBoard.gameBoardArr[x][y] = "X"
            evaluateRow()
            evaluateColumn()
        }
    }
    const play2 = (x, y) => {
        if (gameBoard.gameBoardArr[x][y] !== "O" && gameBoard.gameBoardArr[x][y] !== "X") {
            gameBoard.gameBoardArr[x][y] = "O"
            evaluateRow()
            evaluateColumn()
        }
    } */

    return {evaluateRow, evaluateColumn, play1, play2}

})();


