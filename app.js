
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
    currentPlayer: 0, // switch to 1 when the player swaps

//connect board to indexes
   zero: function () {
    return this.board[0]},



// Pick a space and empty one pip per space until you run out

  move: function(event) {
    let divClicked = event.target.id;
    console.log(gameState[divClicked]())

    //A player must select a div from their side and not the bucket
    // The div must have pips
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

document.getElementById('playerPits').addEventListener('click', gameState.move)
