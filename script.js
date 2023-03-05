const playerFactory = (name) => {
    return {name}
}

(function gameBoard() {
    const arr = Array.from(document.querySelectorAll(".game-tile"))

    let turn = 0
    
    arr.forEach(div => {
        div.addEventListener("click", () => {
            if(turn % 2 === 0) {
                div.style.backgroundColor = "green"
                turn++
                console.log(`${turn} next is red`)
            } else {
                div.style.backgroundColor = "red"
                turn++
                console.log(`${turn} next is green`)
            }

        })
    })
})();

(function gameController() {

})();
