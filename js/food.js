"use strict";

function setFoodRand(num) {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (!cell.isFood && !cell.isSnake && !cell.isPoison) emptyCells.push({ i, j })
        }
    }

    for (var i = 1; i <= num; i++) {
        var rand = genarateRandomNum(0, emptyCells.length - 1);
        gBoard[emptyCells[rand].i][emptyCells[rand].j].isFood = true;
        emptyCells.splice(rand, 1);
    }

}

