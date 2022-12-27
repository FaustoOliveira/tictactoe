let fields = [];
let gameOver = false;
let currentShape = 'circle';
let numberOfMoves = 0;


function fillWithShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'circle') {
            showPlayerCross();
        } else {
            showPlayerCircle();
        }

        fields[id] = currentShape;
        console.log(fields);
        draw();
        checkForWin();
    }
}


function showPlayerCross() {
    currentShape = 'cross';
    document.getElementById('player-1').classList.add('player-inactive');
    document.getElementById('player-2').classList.remove('player-inactive');
    numberOfMoves++;
}


function showPlayerCircle() {
    currentShape = 'circle';
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
    numberOfMoves++;
}


function restart() {
    gameOver = false;
    fields = [];
    numberOfMoves = 0;
    resetAllElements();
    resetWinningLines();
    resetShapes();
}


function resetAllElements() {
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('player-panel').style = '';
    document.getElementById('game-board').classList.remove('d-none');
    document.getElementById('winner').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
}


function resetWinningLines() {
    for (let i = 1; i < 9; i++) {
        document.getElementById('line-' + i).style.transform = 'scaleX(0)';
    }
}


function resetShapes() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('cross-' + i).classList.add('d-none');
        document.getElementById('circle-' + i).classList.add('d-none');
    }
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        placeCross(i);
        placeCircle(i);
    }
}


function placeCross(i) {
    if (fields[i] == 'cross') {
        document.getElementById('cross-' + i).classList.remove('d-none');
    }
}


function placeCircle(i) {
    if (fields[i] == 'circle') {
        document.getElementById('circle-' + i).classList.remove('d-none');
    }
}


function checkForWin() {
    let winner;

    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) { // first row wins
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) { // second row wins
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)';
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) { // third row wins
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)';
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) { // first column wins
        winner = fields[0];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) { // second column wins
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) { // third column wins
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) { // diagonal top left to bottom right wins
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg) scaleX(1)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) { // diagonal top right to bottom left wins
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scaleX(1)';
    }

    if (winner) {
        gameOver = true;
        setTimeout(function () {
            showEndScreen();
        }, 1000);
    }

    if (numberOfMoves == 9) {
        gameOver = true;
        setTimeout(function () {
            showEndScreen();
        }, 1000);
    }

    if (winner == 'cross') {
        document.getElementById('winner').innerHTML = 'Player 1  Wins!!!';
    } else if (winner == 'circle') {
        document.getElementById('winner').innerHTML = 'Player 2  Wins!!!';
    } else if (numberOfMoves == 9) {
        document.getElementById('winner').innerHTML = 'Draw!!!';
    }
}


function showEndScreen() {
    document.getElementById('game-over').classList.remove('d-none');
    document.getElementById('player-panel').style = 'display: none';
    document.getElementById('game-board').classList.add('d-none');
    document.getElementById('winner').classList.remove('d-none');
    document.getElementById('restart-btn').classList.remove('d-none');
}