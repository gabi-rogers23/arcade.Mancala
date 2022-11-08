
//function howManyPlayers
//have pop up ask for how many players (1 or 2)
//Ask for player/players to input name/names
//If one player, put 'computer' for player 2

//Have the game choose player 1 or player 2 to start
//display who's turn it is alternating according to the rules

const newBoard = [
    4, 4, 4, 4, 4, 4, 0, /* player 1 */ 4, 4, 4, 4, 4, 4, 0 /* player 2 */
];

const gameState = {
    board: newBoard, // from above
    currentPlayer: 1, // switch to 2 when the player swaps

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

//needs ending index for the following rules:
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

    stealPips: function(endIndex) {
        let adjustedIndex = endIndex - 1; // The end index from the loop is 1 more than the actual stopping point
        if (gameState.currentPlayer === 1 && gameState.board[adjustedIndex] === 1) {
            // Steal pips from Player 2 in 0 pit
            if (adjustedIndex === 0) {
                let addedPips = gameState.board[0] + gameState.board[12]
                gameState.board[6] += addedPips//take index 0 value + index 12 value += index 6 value
                gameState.board[0] = 0;
                gameState.board[12] = 0;
            }
        }
        // let arrayPairOne = //index 0, 12
        // let arrayPairTwo = //index 1, 11
        // let arrayPairThree = //index 2, 10
        // let arrayPairThree = //index 3, 9
        // let arrayPairFour = //index 4, 8
        // let arrayPairFive = //index 5, 7
    },
    // If the last pip lands on the players side of the board in an empty space they get that pip and the pips across from it 
        // Make Array Pairs i.e. (index 0 and index 12) are a pair

    //select the id to match the keys in the playerIndexes Objects
    move: function (playerClickKey) {
        let pitIndex;
        let copyBoard;

        //checking that a player can only access their side
        if (gameState.currentPlayer === 1) {
            pitIndex = gameState.playerOneIndexes[playerClickKey];
        } else {
            pitIndex = gameState.playerTwoIndexes[playerClickKey];
        }

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
    }

}



// function computerPlayer
//enter Computer under player 2
//use math.random to make it choose a player2side index
//call when player 1's turn is done 



// function endGame
//  call if one side is empty of pips
//  Display which player wins ~or~ if it was a draw

// function gameReset 
//html code reset button
// reset's the board
// reset's the players names?

document.getElementById('playerPits').addEventListener('click', (event) => {
    //purposely named the HTML ids to be the same as the keys to pass them through to the indexed objects
    gameState.move(event.target.id);
    updateBoard();

})

function updateBoard() {

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

}

updateBoard()