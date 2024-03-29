const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

/*
khi các điều kiện sẽ là một mảng chỉ số hai chiều nếu ba ô đều
có cùng một ký tự, chúng tôi sẽ cần kiểm tra điều đó nhưng chúng 
ta sẽ phải biết ô đó cần kiểm tra những gì
*/
const winConditions = [
    // 0 1 2 3 4 5 6 7 8 là row hàng
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //0 3 5 1 4 7 2 5 8 là column cột
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //0 4 8 2 4 6 là đường chéo
    [0, 4, 8],
    [2, 4, 6]
];

let result = [
    "", "", "", "", "", "", "", "
]
//là một mảng rỗng cho mỗi cells
let options = ["", "", "", "", "", "", "", "", ""];
// người chơi hiện tại là X
let currentPlayer = "X";
let running = false;

initializeGame();

//hàm khởi tạo chơi
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

//hàm click vào ô
function cellClicked(){
    //lấy vị trí cell bên html
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    //nếu curent playser = x ngược lại 0 else x 
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition =  winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}