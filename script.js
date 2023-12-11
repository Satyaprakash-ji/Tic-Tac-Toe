const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");

    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"

        boxes.forEach((box) => {
            box.classList.remove("win");
        })
    })


}

initGame();

function swapPlayer(){
    if (currentPlayer === "X"){
        currentPlayer = "0"
    }
    else{
        currentPlayer = "X"
    }
    // UI Update of current player
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let winner = "";
    
    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            &&(gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                
                //Check if winner is X
                if (gameGrid[position[0]] === "X"){
                    winner = "X";
                }
                else{
                    winner = "0";
                }

                // Disable Pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // Now we know X or 0 is Winner so we activet green background
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        
            }
    });

    // Now we have winner
    if (winner !== ""){
        gameInfo.innerText = `Winner Player - ${winner}`
        newGameBtn.classList.add("active");
        return;
    }

    //Lets Check whether there is tie
    let fillCount = "";
    gameGrid.forEach((box) => {
        if (box !== "")
        fillCount++
    })

    if (fillCount === 9){
        gameInfo.innerText = "Tied!"
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if (gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
    // Swap the player
        swapPlayer();
    // Check any one win
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);