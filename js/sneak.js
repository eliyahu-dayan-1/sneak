"use strict";

function moveSnake(event) {
    if(gGame.moveStatus === event.key) return; 
    //TODO: if for the option he try to go back
    if(gGame.moveStatus === "ArrowLeft" && event.key === "ArrowRight") return;
    if(gGame.moveStatus === "ArrowRight" && event.key === "ArrowLeft") return;
    if(gGame.moveStatus === "ArrowUp" && event.key === "ArrowDown") return;
    if(gGame.moveStatus === "ArrowDown" && event.key === "ArrowUp") return;

    var iNextMove = 0;
    var jNextMove = 0;
    switch (event.key) {
        case "ArrowLeft":
            iNextMove = 0;
            jNextMove = -1;
            break;
        case "ArrowRight":
            iNextMove = 0;
            jNextMove = 1;

            break;
        case "ArrowUp":
            iNextMove = -1;
            jNextMove = 0;

            break;
        case "ArrowDown":
            iNextMove = 1;
            jNextMove = 0;
            break;
    }
    gGame.moveStatus = event.key
    moveToLocation({ i: iNextMove, j: jNextMove })
}

function moveToLocation(nextMove) {
    clearInterval(gMoveAuto)
    if(gGame.isFirstMove){
        gGame.isFirstMove = false;
        gGame.isOn = true;
    } 
    if(!gGame.isOn){
        return;
    }

    var iNextMove = nextMove.i;
    var jNextMove = nextMove.j

    var headSneakLoc = gSnake.body[0]
    var lastOfSneakLoc = gSnake.body[gSnake.body.length - 1]
    var lastOfSneakCell = gBoard[lastOfSneakLoc.i][lastOfSneakLoc.j]

    var nextMoveLoc = checkNextMove(headSneakLoc.i + iNextMove, headSneakLoc.j + jNextMove)
    if(!gGame.isOn){
        gameOver()
        return;
    }

    var nextCell = gBoard[nextMoveLoc.i][nextMoveLoc.j]

    if(nextCell.isSnake || nextCell.isPoison){
        gameOver()
        return;
    }

    if (!nextCell.isFood) {
        lastOfSneakCell.isSnake = false;
        lastOfSneakCell.isFood = false;
        lastOfSneakCell.isPoison = false;
        gSnake.body.pop()
    }

    if(nextCell.isFood){
        setFoodRand(1);
        upScore(10);
    }

    gSnake.body.unshift({ i: nextMoveLoc.i, j: nextMoveLoc.j })

    gBoard[nextMoveLoc.i][nextMoveLoc.j].isSnake = true;
    gBoard[nextMoveLoc.i][nextMoveLoc.j].isFood = false;
    gBoard[nextMoveLoc.i][nextMoveLoc.j].isPoison = false;

    renderBoard(gBoard)

    // if(gGame.score%100 === 0 && gGame.score) gLevel.fast -= gLevel.fast 
    
    gMoveAuto = setInterval(moveToLocation, gLevel.fast, {i: iNextMove, j: jNextMove})
}

function checkNextMove(row, col) {
    if (!gLevel.withBorder) {
        if (row >= gBoard.length) row = 0;
        if (row < 0) row = gBoard.length - 1;
        if (col >= gBoard[0].length) col = 0;
        if (col < 0) col = gBoard[0].length - 1;
    }

    if (gLevel.withBorder) {
        if (row >= gBoard.length) gGame.isOn = false;
        if (row < 0) gGame.isOn = false;
        if (col >= gBoard[0].length) gGame.isOn = false;
        if (col < 0) gGame.isOn = false;
        //set place in mat to not het an undifined loction in mat
    }
    return { i: row, j: col }
}

function upScore(num) {
    //TODO up the score
    gGame.score += num;
    renderScore(gGame.score);
}

function renderScore(score){
    document.querySelector('.score').innerHTML = `Score: ${score}`;
}