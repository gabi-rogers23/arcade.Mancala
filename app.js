
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

    six: 6, //player 1 bucket

    playerTwoIndexes: {
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        tweleve: 12,
    },

    thirteen: 13, //player 2 bucket 


// event.target.innerText = pipAmount;


// Pick a space and empty one pip per space until you run out
//select the id to match the keys in the playerIndexes Objects
  move: function(playerClickKey) {
    let pitIndex;

//checking that a player can only access their side
    if (gameState.currentPlayer = 1) {
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

    gameState.board[pitIndex] = 0;
    
    for (let i = pitIndex + 1; i <= pipAmount; i++) {
        gameState.board[i] += 1;
    }

    
    // If a pip goes into the bucket/score keeper it does not come back out
    // If a player goes around, they cannot put any pips in the opposite players bucket/scoreKeeper
    // If the last pip lands in the bucket/score keeper then they get to go again 
    // If the last pip lands on the players side of the board in an empty space they get that pip and the pips across from it 
        // Make Array Pairs i.e. (index 0 and index 12) are a pair
  }

}



// function computerPlayer
    //enter Computer under player 2
    //use math.random to make it choose a player2side index
    //call when player 1's turn is done 
    


// function endGame
    //  call if one side is empty of pips
    //  Display which player wins ~or~ if it was a draw

// Player 1 side indexes = 0,1,2,3,4,5,
// Player 1 side Bucket = 6

// Player 2 side indexes = 7,8,9,10,11,12,
// Player 2 side Bucket =13

// function gameReset 
    //html code reset button
    // reset's the board
    // reset's the players names?

document.getElementById('playerPits').addEventListener('click', (event)=> {
    //purposely named the HTML ids to be the same as the keys to pass them through to the indexed objects
gameState.move(event.target.id);
updateBoard();

}) 

function updateBoard() {
    
}