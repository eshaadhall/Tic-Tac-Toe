/*---- Tic-Tac-Toe Game In JavaScript 9-2-2018 ----*/
/*---- Multi-Player Home Page ----*/
var divScreen = document.createElement('div');
divScreen.className = "screen screen-start";
divScreen.id = "start";
var headerScreen = document.createElement('header');
var h1Screen = document.createElement('h1');
h1Screen.textContent = "Tic Tac Toe";
var a = document.createElement('a');
a.href = '#';
a.className = 'button';
a.textContent = 'Start Game';
headerScreen.appendChild(h1Screen);
var label1 = document.createElement('label');
label1.textContent = "Enter Name Player O";
label1.className = "label1";
var input1 = document.createElement('input');
input1.type = 'text';
input1.className = 'input1';
input1.placeholder = 'Player1';
label1.appendChild(input1);
headerScreen.appendChild(label1);
var label2 = document.createElement('label');
label2.textContent = "Enter Name Player X";
label2.className = "label2";
var input2 = document.createElement('input');
input2.type = 'text';
input2.className = 'input2';
input2.placeholder = 'Player2';
label2.appendChild(input2);
headerScreen.appendChild(label2);
headerScreen.appendChild(a);
divScreen.appendChild(headerScreen);
divScreen.style.display = "none";
const mainDiv = document.querySelector('.board');
const body = document.querySelector('body');
body.appendChild(divScreen);
var player1 = document.querySelector('#player1');
var player2 = document.querySelector('#player2');
var ul = document.querySelector('.boxes');
var boxes = ul.children;
/*---- Wining Combinations ----*/
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]
var board;
var name1;
var name2;
var nameLabel1 = document.createElement('label');
var nameLabel2 = document.createElement('label');
nameLabel1.className = 'nameLabel';
nameLabel2.className = 'nameLabel';
player1.appendChild(nameLabel1);
player2.appendChild(nameLabel2);
var turn;
var newBoard;
let gameWon;
/* ---- Home Screen (Multi-Player OR Single Player Options) ---- */
var divHome = document.createElement('div');
divHome.className = "screen screen-home";
divHome.id = "start";
var headerHome = document.createElement('header');
var h1Home = document.createElement('h1');
h1Home.textContent = "Tic Tac Toe";
headerHome.appendChild(h1Home);
var singlePlayer = document.createElement('a');
singlePlayer.href = '#';
singlePlayer.className = 'button1';
singlePlayer.textContent = "Single Player";
headerHome.appendChild(singlePlayer);
var multiPlayer = document.createElement('a');
multiPlayer.href = '#';
multiPlayer.className = 'button2';
multiPlayer.textContent = "Multi-Player";
headerHome.appendChild(multiPlayer);
divHome.appendChild(headerHome);
body.appendChild(divHome);

/* ---- When the page loads, the startup screen should appear. ---- */
/* ---- Step 1 ---- */
document.addEventListener("DOMContentLoaded", function(){
    divHome.style.display = "";
    divScreen.style.display = "none";
    mainDiv.style.display = "none";
});
/*---- When user clicks on the MultiPlayer Button on Home Page ----*/
multiPlayer.addEventListener('click', function(){
  divHome.style.display = "none";
  divScreen.style.display = "";
  mainDiv.style.display = "none";
});

/* ---- Add programming, so that when the player clicks the start button the start screen disappears, the board appears, and the game begins. ---- */
/* ---- Step 2 ---- */
a.addEventListener("click", function(){
    board = Array.from(Array(9).keys()); // Array of 0 to 8 numbers
    divScreen.style.display = "none";
    mainDiv.style.display = "";
    player1.className = 'players active';
    name1 = input1.value;
    name2 = input2.value;
    nameLabel1.textContent = name1.toUpperCase();
    nameLabel2.textContent = name2.toUpperCase();
    for(let i=0; i<board.length; i++){
      boxes[i].addEventListener('click', playerClick, true);
      boxes[i].addEventListener('mouseover', cursorOn, true);
      boxes[i].addEventListener('mouseleave', cursorLeave, true);
    }
});

// add a mouseover
function cursorOn(event){
    if(!(event.target.className.includes('box-filled-1')) && !(event.target.className.includes('box-filled-2'))){
     if(player1.className.includes('active')){
       event.target.style.backgroundImage = "url('img/o.svg')";
     } else {
       event.target.style.backgroundImage = "url('img/x.svg')";
     }
}
}
function cursorLeave(event){
  if(!(event.target.className.includes('box-filled-1')) && !(event.target.className.includes('box-filled-2'))){
       event.target.style.backgroundImage = "none";
       }
}

// when the multiplayer user clicks on the tic tac toe board.
function playerClick(event){
  if(!event.target.className.includes('box box-filled-1') || !event.target.className.includes('box box-filled-2')){
    if(player1.className.includes('active') && !event.target.className.includes('box box-filled-1') && !event.target.className.includes('box box-filled-2')){
      event.target.className = 'box box-filled-1';
      player1.className = 'players';
      player2.className = 'players active';
      playerTurn(event.target.id,player1);
} else if(player2.className.includes('active') && !event.target.className.includes('box box-filled-1') && !event.target.className.includes('box box-filled-2')) {
      event.target.className = 'box box-filled-2';
      player1.className = 'players active';
      player2.className = 'players';
      playerTurn(event.target.id, player2);
    }
 }
}

// Determine Winner MultiPlayer
function playerTurn(cellID, player){
     board[cellID] = player.id;
     boxes[cellID].removeEventListener('click', playerClick, false);
     boxes[cellID].removeEventListener('mouseover', cursorOn, false);
     boxes[cellID].removeEventListener('mouseleave', cursorLeave, false);
     console.log(boxes[cellID]);
     let gameWon = checkWin(board, player.id);
     if(gameWon !== null){
     gameOver(gameWon);
   } else {
     checkTie(board);
   }
}

// for ... of loop allows to break in between of the loop
function checkWin(boards, player){
  let game = boards.reduce((a,e,i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null
  for(let[index, win] of winCombos.entries()){
    if(win.every(elem => game.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
  // will return the winning index from winCombos and the player who won, if no one wins it will return null.
}
/* ---- for End Game ---- */
var divEnd = document.createElement('div');
divEnd.id = 'finish';
var headerEnd = document.createElement('header');
var h1End = document.createElement('h1');
h1End.textContent = "Tic Tac Toe";
var p = document.createElement('p');
p.className = 'message';
var aEnd = document.createElement('a');
aEnd.href = '#';
aEnd.className = 'button';
aEnd.textContent = "New game";
headerEnd.appendChild(h1End);
headerEnd.appendChild(p);
headerEnd.appendChild(aEnd);
divEnd.appendChild(headerEnd);
body.appendChild(divEnd);
divEnd.style.display = "none";

function removelisteners(){
  for(let i=0; i<board.length; i++){
    boxes[i].removeEventListener('click', playerClick, false);
    boxes[i].removeEventListener('mouseover', cursorOn, false);
    boxes[i].removeEventListener('mouseleave', cursorLeave, false);
  }
}

function gameOver(gameWon){
  let player = gameWon.player;
  removelisteners();
  if(player === 'player1'){
    p.textContent = name1 + 'Winner';
    mainDiv.style.display = "none";
    divEnd.className = 'screen screen-win screen-win-one';
    divEnd.style.display = "";
  } else {
    p.textContent = name2 + ' Winner';
    mainDiv.style.display = "none";
    divEnd.className = 'screen screen-win screen-win-two';
    divEnd.style.display = "";
  }
}

function checkTie(board){
 if(emptyBoxes(board).length === 0 && (gameWon === undefined || gameWon === null)){
   mainDiv.style.display = "none";
   divEnd.className = 'screen screen-win screen-win-tie';
   p.textContent = "It's a Tie!";
   divEnd.style.display = "";
   return true;
 }
 return false;
}

function emptyBoxes(){
  return board.filter(s => typeof s === 'number');
}
/* ---- When the user pushes the "New Game" button, the board appears again, empty, and a new game begins. ---- */
aEnd.addEventListener('click', function(event){
  divEnd.style.display = "none";
  divScreen.style.display = "none";
  mainDiv.style.display = "";
  for(var i=0; i<board.length; i++){
    boxes[i].className = 'box';
    boxes[i].style.removeProperty('background-image');
    board[i] = i;
  }
  player1.className = 'players active';
  player2.className = 'players';
});

/* ---- Extra Credit ---- */
/* ---- single player game vs the computer ---- */

singlePlayer.addEventListener('click', function(event){
  divHome.style.display = "none";
  mainDiv.style.display = "";
  board = Array.from(Array(9).keys()); // Array of 0 to 8 numbers
  divScreen.style.display = "none";
  mainDiv.style.display = "";
  player1.className = 'players active';
  name1 = input1.value;
  nameLabel1.textContent = "Player";
  nameLabel2.textContent = "Computer";
  for(let i=0; i<board.length; i++){
    boxes[i].addEventListener('click', splayerClick, true);
    boxes[i].addEventListener('mouseover', playerMouseover, true);
    boxes[i].addEventListener('mouseleave', cursorLeave, true);
  }
});

function playerMouseover(event){
  if(!(event.target.className.includes('box-filled-1')) && !(event.target.className.includes('box-filled-2'))){
   if(player1.className.includes('active')){
     event.target.style.backgroundImage = "url('img/o.svg')";
   }
}
}
/*---- when the single player clicks on the board for their turn ----*/
function splayerClick(event){
  if(!event.target.className.includes('box box-filled-1') || !event.target.className.includes('box box-filled-2')){
    if(player1.className.includes('active') && !event.target.className.includes('box box-filled-1') && !event.target.className.includes('box box-filled-2')){
      event.target.className = 'box box-filled-1';
      player1.className = 'players';
      player2.className = 'players active';
      clickTurn(event);
    }
}
}

function clickTurn(event){
      if(typeof board[event.target.id] === 'number'){
        splayerTurn(event.target.id, "player1");
         if(!checkTie() && gameWon === null){
          splayerTurn(bestCell(), "player2");
        }
      }
}

/*---- Calls the minimax function for the Computers Turn ----*/
function bestCell(){
  var s = minimax(board, "player2").index;
  return s; // will return the index
}

function sgameOver(gameWon){
  let player = gameWon.player;
  removelisteners();
  if(player === 'player1'){
    p.textContent = "You Win";
    mainDiv.style.display = "none";
    divEnd.className = 'screen screen-win screen-win-one';
    divEnd.style.display = "";
  } else {
    p.textContent = 'Computer Wins';
    mainDiv.style.display = "none";
    divEnd.className = 'screen screen-win screen-win-two';
    divEnd.style.display = "";
  }
}

function splayerTurn(cellID, player){
  if(cellID !== undefined){
  board[cellID] = player;

  if(player === "player2"){
    console.log("Move Blue", player);
    boxes[cellID].className = "box box-filled-2";
    boxes[cellID].style.backgroundImage = "url('img/x.svg')";
    player2.className = 'players';
    player1.className = 'players active';
  }
 }
gameWon = checkWin(board, player);
  if(gameWon !== null){
  sgameOver(gameWon);
   } else {
     checkTie(board);
 }
}

function minimax(newBoard, turns){
  var movesLeft = emptyBoxes(newBoard);

   if(checkWin(newBoard, turns) !== null){
     return {score: -10};
   }else if(checkWin(newBoard, "player2") !== null){
     return {score: 20};
   } else if(movesLeft.length === 0){
     return {score : 0};
   }
       var moves= [];
      for(let i=0; i<movesLeft.length; i++){
        var move={};
        move.index = newBoard[movesLeft[i]];
        newBoard[movesLeft[i]] = turns;
        if(turns == 'player2'){
          var result = minimax(newBoard, "player1");
          move.score = result.score;
        }else{
          var result = minimax(newBoard, "player2");
          move.score = result.score;
        }
        // reset the newBoard.
        newBoard[movesLeft[i]] = move.index;
        moves.push(move);
    }
       var bestMove;
         if(turns === 'player2'){
           var max_score_index = -10000;
           for(let j=0; j<moves.length; j++){
              if(moves[j].score > max_score_index){
                max_score_index = moves[j].score;
                bestMove = j;
              }
            }
          } else {
              var min_score_index = 10000;
              for(let k=0; k<moves.length; k++){
                 if(moves[k].score < min_score_index){
                   min_score_index = moves[k].score;
                   bestMove = k;
                 }
            }
  }
  return moves[bestMove];
}
