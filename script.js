// 1. The Gameboard Module (IIFE - only one exists)
const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMark = (index, mark) => {
        console.log(`${mark} mark placed at ${index}`)
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, placeMark, resetBoard };
})();

// 2. The Player Factory (To create multiple players)
const Player = (name, mark) =>  ({ name, mark });


// 3. The Game Controller Module (IIFE - the "Brain")

const GameController = (function() {
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");
    let activePlayer = playerOne;

    const switchPlayer = () => {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winConditions.some(condition => {
            return condition.every(index => board[index] === activePlayer.mark);
        });
    };

    const playRound = (index) => {
        const board=Gameboard.getBoard();
        // const board=[1, 2, 3, 4, 5, 6, 7, 8, 9]
        console.log(`Moving to square ${index} for ${activePlayer.name}...`);
        
        const success = Gameboard.placeMark(index, activePlayer.mark);
        
        const cells= document.querySelectorAll('.cell')
    board.forEach((val, index)=>{
        // console.log(`${val}: ${board[index]} at index ${index}`);
        // cell.InnerText= board[index];
        cells[index].InnerText=board[index];
        console.log(`${index}: ${board[index]}`);
    })



        
        if (!success) {
            console.log("Spot taken! Try again.");
            return;
        }

        if (checkWin()) {
            console.log(`GAMEOVER: ${activePlayer.name} wins!`);
            return;
        }

        if (!Gameboard.getBoard().includes("")) {
            console.log("It's a tie!");
            return;
        }

        switchPlayer();
        console.log(`It is now ${activePlayer.name}'s turn.`);
    };

    return { playRound };
})();


// const RenderBoard= function(){
//     document.querySelectorAll('.cell').forEach((cell, index)=>{
//         cell.innerHTML= board[index];
//     })
// }


GameController.playRound(0);
GameController.playRound(5);
GameController.playRound(1);
GameController.playRound(4);
GameController.playRound(2);
