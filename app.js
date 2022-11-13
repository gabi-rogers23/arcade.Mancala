
//Have the game choose player 1 or player 2 to start
let startButton = document.getElementById('start');
let onePlayer = document.getElementsByClassName('numOfPlayers')[0];
let twoPlayers = document.getElementsByClassName('numOfPlayers')[1];
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');

const playerState = {

computerize: false,
player2name: null,


startGame: function() { // ask for how many players (1 or 2)
    startButton.style.visibility = 'hidden';
    onePlayer.style.visibility = 'visible';
    twoPlayers.style.visibility = 'visible';
 },

//Ask for player/players to input name/names
onePlayer: function() { //If one player, put 'computer' for player 2
    onePlayer.style.visibility = 'hidden';
    twoPlayers.style.visibility = 'hidden';
    player2.style.visibility = 'hidden';
    document.getElementById('player1Input').style.visibility = 'visible';
    document.getElementById('enter').style.visibility = 'visible';
    playerState.player2name = 'Computer'
    playerState.computerize = true;
 },

twoPlayers: function() {
    onePlayer.style.visibility = 'hidden';
    twoPlayers.style.visibility = 'hidden';
    player1.style.visibility = 'hidden';
    player2.style.visibility = 'hidden';
    document.getElementById('player1Input').style.visibility = 'visible';
    document.getElementById('player2Input').style.visibility = 'visible';
    document.getElementById('enter').style.visibility = 'visible';
},

whoStarts: function() {
   gameState.currentPlayer = Math.floor(Math.random() * 2 + 1);
   console.log(gameState.currentPlayer);
   document.getElementById('enter').style.visibility = 'hidden';
   document.getElementById('player1Input').style.visibility = 'hidden';
   document.getElementById('reset').style.visibility = 'visible'

   document.getElementById('player2Input').style.visibility = 'hidden';
   player1.innerText = document.getElementById('player1Input').value;
   if (playerState.computerize === true) {
    player2.innerText = "Computer";

    if (gameState.currentPlayer === 2 && playerState.computerize === true) {
        calculateComputerTurn();
       } 
} else {
    playerState.player2name = document.getElementById('player2Input').value;
    player2.innerText = playerState.player2name;
}
   updateBoard();
},

reset: function() {
    startButton.style.visibility = 'visible';
    onePlayer.style.visibility = 'hidden';
    twoPlayers.style.visibility = 'hidden';
    playerState.computerize = false;
    player2name = null;
    player1.innerText = "";
    player1.style.visibility = 'hidden';
    player2.innerText = "";
    player2.style.visibility = 'hidden';
    document.getElementById('player1Input').value = "";
    document.getElementById('player2Input').value = "";
    document.getElementById('reset').style.visibility = 'hidden';
},

}

startButton.addEventListener('click', playerState.startGame);

onePlayer.addEventListener('click', playerState.onePlayer);

twoPlayers.addEventListener('click', playerState.twoPlayers);

document.getElementById('enter').addEventListener('click', playerState.whoStarts);

/////////////


const gameState = {
    board: [
        4, 4, 4, 4, 4, 4, 0, /* player 1 */ 4, 4, 4, 4, 4, 4, 0 /* player 2 */
    ],

    currentPlayer: 0,

    //connect board to indexes
    playerOneIndexes: {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
    },

    sixEnd: 6, //player 1 bucket

    playerTwoIndexes: {
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
    },

    thirteenEnd: 13, //player 2 bucket 

//needs endingIndex passed in for the following rules:

// If the last pip lands in the bucket/score keeper then they get to go again 
    switchPlayer: function(endIndex) {

        if (gameState.currentPlayer === 1) {
            if (endIndex === 7){ /* off by one because the for loop stops at less than 7 */
                return;
            }       
            gameState.currentPlayer = 2;
        } else {
           
            if (endIndex === 13){
                return;
            }
            gameState.currentPlayer = 1;
        }

    },

     // If the last pip lands on the players side of the board in an empty space they get that pip and the pips across from it 
    stealPips: function(endIndex) {
        let adjustedIndex = (endIndex - 1) % 13; // The end index from the loop is 1 more than the actual stopping point
        // console.log(adjustedIndex);

        //Player 1// 
        if (gameState.currentPlayer === 1 && gameState.board[adjustedIndex] === 1) {
            let addedPips = 0;
            // Steal pips from Player 2 in 0 pit
            if (adjustedIndex === 0 && gameState.board[12] !== 0) {
                addedPips = gameState.board[0] + gameState.board[12]
                 //take index 0 value + index 12 value += index 6 value
                gameState.board[0] = 0;
                gameState.board[12] = 0;
            } else if (adjustedIndex === 1 && gameState.board[11] !== 0) { //Steal from player 2 in 1 pit
                addedPips = gameState.board[1] + gameState.board[11];
                gameState.board[1] = 0;
                gameState.board[11] = 0;
            } else if (adjustedIndex === 2 && gameState.board[10] !== 0) {
                addedPips = gameState.board[2] + gameState.board[10];
                gameState.board[2] = 0;
                gameState.board[10] = 0;
            } else if (adjustedIndex === 3 && gameState.board[9] !== 0) {
                addedPips = gameState.board[3] + gameState.board[9];
                gameState.board[3] = 0;
                gameState.board[9] = 0;
            } else if (adjustedIndex === 4 && gameState.board[8] !== 0) {
                addedPips = gameState.board[4] + gameState.board[8];
                gameState.board[4] = 0;
                gameState.board[8] = 0;
            } else if (adjustedIndex === 5 && gameState.board[7] !== 0) {
                addedPips = gameState.board[5] + gameState.board[7];
                gameState.board[5] = 0;
                gameState.board[7] = 0;
            }
            console.log('added Pips =' + addedPips + ' current goal ' + gameState.board[6]);
            gameState.board[6] += addedPips
        }

        //Player 2//
        adjustedIndex = endIndex % 13;
        // console.log(adjustedIndex)
        if (gameState.currentPlayer === 2 && gameState.board[adjustedIndex] === 1) {
         addedPips = 0;

            if (adjustedIndex === 12 && gameState.board[0] !== 0) {
                addedPips = gameState.board[12] + gameState.board[0]
                 //take index 0 value + index 12 value += index 6 value
                gameState.board[0] = 0;
                gameState.board[12] = 0;
            } else if (adjustedIndex === 11 && gameState.board[1] !== 0) { 
                addedPips = gameState.board[11] + gameState.board[1];
                gameState.board[1] = 0;
                gameState.board[11] = 0;
            } else if (adjustedIndex === 10 && gameState.board[2] !== 0) {
                addedPips = gameState.board[10] + gameState.board[2];
                gameState.board[2] = 0;
                gameState.board[10] = 0;
            } else if (adjustedIndex === 9 && gameState.board[3] !== 0) {
                addedPips = gameState.board[9] + gameState.board[3];
                gameState.board[3] = 0;
                gameState.board[9] = 0;
            } else if (adjustedIndex === 8 && gameState.board[4] !== 0) {
                addedPips = gameState.board[8] + gameState.board[4];
                gameState.board[4] = 0;
                gameState.board[8] = 0;
            } else if (adjustedIndex === 7 && gameState.board[5] !== 0) {
                addedPips = gameState.board[7] + gameState.board[5];
                gameState.board[5] = 0;
                gameState.board[7] = 0;
            }
            console.log('added Pips =' + addedPips + ' current goal ' + gameState.board[13]);
            gameState.board[13] += addedPips
        }
    },
   
    clickMove: function (playerClickKey) {
        let pitIndex;

        //checking that a player can only access their side
        if (gameState.currentPlayer === 1) {
            pitIndex = gameState.playerOneIndexes[playerClickKey];
        } else {
            pitIndex = gameState.playerTwoIndexes[playerClickKey];
        }

        gameState.move(pitIndex);
    },

    //select the id to match the keys in the playerIndexes Objects
    move: function (pitIndex) {
        
        if (pitIndex === null || pitIndex === undefined) {
            return; //the player selected an invalid index
        }
        // The div must have pips
        let pipAmount = gameState.board[pitIndex];
        if (pipAmount === 0) {
            return;
        }
        //empty selected pit
        gameState.board[pitIndex] = 0;
        let startIndex;
        
        //cut out index 13 for player 1 & index 6 for player 2
        if (gameState.currentPlayer === 1) {
            copyBoard = gameState.board.slice(0,13);
            startIndex = pitIndex + 1;
        } else {
            playerOneSide = gameState.board.slice(0,6); //get array index 0-5
            playerTwoSide = gameState.board.slice(7); //get array index 7-13
            copyBoard = playerOneSide.concat(playerTwoSide); //this copyBoard is 1 index short so pitIndex will be where to start adding
            startIndex = pitIndex;
        }
        console.log(copyBoard)
        //find the last index that a pip went into
        let endIndex = startIndex + pipAmount;

        // empty one pip per pit 
        for (let i = startIndex; i < endIndex; i++) {
            //loop around the array using mod to never get over the length of the array.  Returns the remainder and indexes into the array at that remainder amount.
            let loop = i % copyBoard.length;
            copyBoard[loop] += 1;
        }

        // If a player goes around the board, they cannot put any pips in the opposite players bucket/scoreKeeper

        if (gameState.currentPlayer === 1) {
            copyBoard.push(gameState.board[13]);
        } else {
            copyBoard.splice(6, 0, gameState.board[6]);
        }
        gameState.board = copyBoard;
        console.log(copyBoard);
        gameState.stealPips(endIndex);
        gameState.switchPlayer(endIndex);

        console.log('Gameboard ' + gameState.board)

        if (gameState.isGameOver()) {
            return;
        }

        if (gameState.currentPlayer === 2 && playerState.computerize === true) {
            calculateComputerTurn();
            console.log('Gameboard after computer' + gameState.board)
           } 
           
           
    },

    playerOneBoardEmpty: function () {
        //checking Player 1 Indexes
        for (let i = 0; i <= 5; i++ ) { 
            let amount = gameState.board[i]
            if (amount === 0) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    },

    playerTwoBoardEmpty: function () {
        //checking Player 2 indexes
        for (let i = 7; i <= 12; i++ ) { 
            let amount = gameState.board[i]
            if (amount === 0) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    },

    isGameOver: function () {
        return gameState.playerOneBoardEmpty() || gameState.playerTwoBoardEmpty()  
    },

    reset: function() {
        gameState.board = [ 4, 4, 4, 4, 4, 4, 0, /* player 1 */ 4, 4, 4, 4, 4, 4, 0 /* player 2 */];
        gameState.currentPlayer = 0;
    }
}


function calculateComputerTurn() {
    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * (13 - 7) + 7);

        while (gameState.board[randomIndex] === 0) { //while 0 keep looking for a random index
            randomIndex =  Math.floor(Math.random() * (13 - 7) + 7);
        } 
        console.log("computer move index " + randomIndex)
        gameState.move(randomIndex)
        updateBoard();
      }, 1500);
}


document.getElementById('playerPits').addEventListener('click', (event) => {
    //purposely named the HTML ids to be the same as the keys to pass them through to the indexed objects
    
    if (playerState.currentPlayer === 0){ 
        return; //blocks clicks before the players are set
    }

    if (playerState.currentPlayer === 2 && playerState.computerize === true){
        return; //blocks clicks when it's the computer's turn
    }

    gameState.clickMove(event.target.id);

    updateBoard();
    
})

document.getElementById('reset').addEventListener('click', (event) => {
    playerState.reset();
    gameState.reset();
    document.getElementById('winner').style.visibility = 'hidden';
    document.getElementById('gameboard').style.visibility = 'visible';
    updateBoard();
})


//render gameState.board values to HTML
function updateBoard() {
///if the game ends
    if (gameState.isGameOver()){
        document.getElementById('gameboard').style.visibility = 'hidden';
        player1.style.visibility = 'visible';
        player2.style.visibility = 'visible';
        document.getElementById('winner').style.visibility = 'visible';

        player1.innerText = `${document.getElementById('player1Input').value}'s Score is ${gameState.board[6]}`;

        player2.innerText = `${playerState.player2name}'s Score is ${gameState.board[13]}`;
//who wins
        if (gameState.board[6] > gameState.board[13]) {
            document.getElementById('winner').innerText = `${document.getElementById('player1Input').value} WINS!`
        } else if (gameState.board[6] < gameState.board[13]) {
            document.getElementById('winner').innerText = `${playerState.player2name} WINS!`
        } else if (gameState.board[6] === gameState.board[13]) {
            document.getElementById('winner').innerText = "It's a Draw! Play Again!"
        }

    } else {
        document.getElementById('zero').innerText = gameState.board[0];
        document.getElementById('one').innerText = gameState.board[1];
        document.getElementById('two').innerText = gameState.board[2];
        document.getElementById('three').innerText = gameState.board[3];
        document.getElementById('four').innerText = gameState.board[4];
        document.getElementById('five').innerText = gameState.board[5];
        document.getElementById('sixEnd').innerText = gameState.board[6];
        document.getElementById('seven').innerText = gameState.board[7];
        document.getElementById('eight').innerText = gameState.board[8];
        document.getElementById('nine').innerText = gameState.board[9];
        document.getElementById('ten').innerText = gameState.board[10];
        document.getElementById('eleven').innerText = gameState.board[11];
        document.getElementById('twelve').innerText = gameState.board[12];
        document.getElementById('thirteenEnd').innerText = gameState.board[13];
        
        //switching the name label of who is playing
        if (gameState.currentPlayer === 1){
            player1.style.visibility = 'visible';
            player2.style.visibility = 'hidden';
        } else if (gameState.currentPlayer === 2) {
            player1.style.visibility = 'hidden';
            player2.style.visibility = 'visible';
        }
    }
}

updateBoard()
