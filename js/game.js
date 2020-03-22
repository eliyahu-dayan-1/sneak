"use strict";

//const
var SNAKE = "🔴";
var FOOD = "🍔";
var EMPTY = "";
var POISON = "👽";

//obj
var gBoard = [];

var gSnake = {
    long: 0,
    body:[]
}

//game over element
var gElGameOver = document.querySelector('.gameOver')

//state
var gLevel = {
    SIZE: 0,
    MINES: 0,
    FOOD: 0,
    fast: 0,
    withBorder: false,
}

var gGame = {
    isOn: false,
    isFirstMove: true,
    cntFood: 0,
    moveStatus: "",
    score: 0,
}

var gMoveAuto;

function initGame(size, food, fast, withBorder){
    resetState(size, food, fast, withBorder)
    gBoard = creatBoard(size, size)
    //setHeadOf snake
    var middleBoard = Math.floor(size/2);
    gBoard[middleBoard][middleBoard].isSnake = true;
    gSnake.body.unshift({i:middleBoard, j:middleBoard})
    setFoodRand(food)
    renderScore(0)
    gBoard[1][1].isPoison = true;
    gBoard[3][3].isPoison = true;
    renderBoard(gBoard)
    gElGameOver.classList.remove('display')
}

function resetState(size, food, fast, withBorder){
    gSnake = {
        body:[]
    }
    //state
    gLevel = {
        SIZE: size,
        MINES: 0,
        FOOD: food,
        fast: fast,
        withBorder: withBorder,
    }
    
    gGame = {
        isOn: false,
        isFirstMove: true,
        moveStatus: "",
        score: 0,
    }
    clearInterval(gMoveAuto)
}



function creatBoard(row, col) {
    var board = []
    for (var i = 0; i < row; i++) {
        board.push([]);
        for (var j = 0; j < col; j++) {
            board[i].push({
                isFood: false,
                isSnake: false,
                isPoison: false,
            });
        }
    }

    return board;
}


function renderBoard(board) {
    var strHtml = ``
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>\n`
        for (var j = 0; j < board[0].length; j++) {
            var cell = (board[i][j].isFood) ? FOOD
                : (board[i][j].isPoison) ? POISON
                    : (board[i][j].isSnake) ? SNAKE
                        : EMPTY;

            var dataSet = `data-i=${i} data-j=${i}`;
            var classes = `cell ${i}-${j} `
            strHtml += `<td class="${classes}" ${dataSet}>${cell}</td>\n`
        }
        strHtml += `</tr>\n`
    }
    document.querySelector('.board').innerHTML = strHtml;
}



function gameOver(){
    gGame.isOn = false;
    console.log(`game over`)
    gElGameOver.innerText = "GAME OVER\t🤦‍♂️"
    gElGameOver.classList.add('display')
}

function newGame(){
    console.log(`newGame`)
}