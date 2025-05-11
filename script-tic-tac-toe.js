let isComputerTurn = false;

const winning=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]];

let boxes=document.querySelectorAll('.button');
let turn=0;

function playermove(event){
  if (isComputerTurn) return;

  const clicked=event.target;

  if (clicked.tagName !=='BUTTON') return;

  if(turn===0){
    clicked.innerText="0";
    turn++;
  }
  else{
    clicked.innerText="X";
    turn--;
  }
  clicked.disabled=true;
  checkwin();
  if (gameMode === "computer" && turn === 1) {
    isComputerTurn = true; //  lock input
    setTimeout(() => {
      computerMove();
      isComputerTurn = false; //  unlock after move
    }, 500);
  }
}

function computerMove() {
   for (let pattern of winning) {
    let [a, b, c] = pattern;
    let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];

    if (values.filter(v => v === "X").length === 2 && values.includes("")) {
      let emptyIndex = [a, b, c][values.indexOf("")];
      boxes[emptyIndex].innerText = "X";
      boxes[emptyIndex].disabled = true;
      turn--;
      checkwin();
      return;
    }
  }

  // Try to block player
  for (let pattern of winning) {
    let [a, b, c] = pattern;
    let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
    
    if (values.filter(v => v === "0").length === 2 && values.includes("")) {
      let emptyIndex = [a, b, c][values.indexOf("")];
      boxes[emptyIndex].innerText = "X";
      boxes[emptyIndex].disabled = true;
      turn--;
      checkwin();
      return;
    }
  }
  
  let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
  
  if (emptyBoxes.length > 0) {
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    turn--;
    checkwin();
  }
}

function checkwin(){
  for (let pattern of winning){

    let move1 = boxes[pattern[0]].innerText;
    let move2 = boxes[pattern[1]].innerText;
    let move3 = boxes[pattern[2]].innerText;

    if(move1!=''&&move2!=''&&move3!=''){
      if(move1==move2&&move1==move3){        
        boxdisable();
        winnershow(move1);
      }
    }
  }

  let allFilled = true;

  for (let box of boxes) {
    if (box.innerText === '') {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    showDraw();
  }
}

function boxdisable(){
  for(box of boxes){
    box.disabled=true;
  }
}

function winnershow(move1){
  const wining_hide=document.querySelector('.topsection');
  const wining_Show=document.querySelector('.winnerpop');
  let tohtml='';
  let html=`
  <p>Player ${move1} wins</p><br>
  <button onclick="
  reset();

  "
  class="newbutton"
  >NEW GAME</button>
  `;
  tohtml+=html;
  wining_Show.innerHTML=tohtml;
  wining_hide.classList.remove('hide');
  
}

function boxenable(){
  for(box of boxes){
    box.disabled=false;
    box.innerText="";
  }
}

function hidewin(){
  const wining_hide=document.querySelector('.topsection');
  const wining_Show=document.querySelector('.winnerpop');
  wining_hide.classList.add('hide');
  wining_Show.innerText="";
}

function reset(){
  turn=0;
  hidewin();
  boxenable();
}

function showDraw() {
  const wining_hide = document.querySelector('.topsection');
  const wining_Show = document.querySelector('.winnerpop');
  let tohtml = '';
  let html = `
    <p>Draw</p><br>
    <button onclick="reset() " class="drawbutton">NEW GAME</button>
  `;
  tohtml += html;
  wining_Show.innerHTML = tohtml;
  wining_hide.classList.remove('hide');
}

let gameMode = ""; 

function startGame(mode) {
  gameMode = mode;
  document.getElementById('modeSelection').style.display = 'none';
  document.querySelector('.centerdiv').style.display = 'flex';
  reset();
  
}

document.querySelector('.centerdiv').style.display = 'none';

function showModeScreen() {
  document.querySelector('.centerdiv').style.display = 'none';
  document.getElementById('modeSelection').style.display = 'flex';
}
