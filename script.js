// console.log("game started")

const Gameboard=(()=>{
    let board=["", "", "", "","", "", "", "", "" ];

    const getBoard=()=>board;

    const placeMark= (index, mark)=>{
        if(board[index]===""){
            board[index]=mark;
            return true;
        }
        return false;
    };

    const reset=()=>{
        board=["", "", "", "", "", "", "", "", ""];
    };

    return {getBoard, placeMark, reset};

})();

const Player= (name, mark)=>{
    return {name, mark};
};

const player1= Player("Tauqeer", "X");
console.log(player1);


Gameboard.placeMark(index, mark);






Gameboard.placeMark(0, "X");
console.log(Gameboard.getBoard());