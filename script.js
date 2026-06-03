const Gameboard = (function () {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }
  const GetBoard = () => {
    return board;
  };
  const printBoard = () => {
    console.log(board.map((cell) => cell.getMark()));
  };
  const putMark = (index, player) => {
    if (board[index].getMark() != 0) {
      console.log("invalid position");
      return;
    } else {
      // console.log("inside putmark function. successful");
      board[index].addMark(player);
    }
  };
  return { GetBoard, putMark, printBoard };
})();

function Cell() {
  let mark = 0;
  const addMark = (player) => {
    mark = player.mark;
  };
  const getMark = () => mark;
  return { addMark, getMark };
}

const GameController = (function (
  playerONeName = "Player one",
  playerTwoName = "player two",
) {
  let isGameOver = false;
  const players = [
    {
      name: playerONeName,
      mark: "o",
    },
    {
      name: playerTwoName,
      mark: "x",
    },
  ];
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    // board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const CheckWin = (p) => {
    const winningPatterns = [7, 56, 73, 84, 146, 273, 292, 448];

    let posValue = 0;
    for (let i = 0; i < Gameboard.GetBoard().length; i++) {
      // console.log(Gameboard.GetBoard()[0].getMark());
      if (Gameboard.GetBoard()[i].getMark() === p.mark) {
        posValue += 2 ** (8 - i);
      }
    }
    console.log({ posValue });
    if (winningPatterns.includes(posValue)) {
      isGameOver = true;
      Gameboard.printBoard();

      return `${p.name} wins`;
    } else {
      return `keep playing no win`;
    }
  };

  const playRound = (position) => {
    if (isGameOver) {
      console.log("game already over start a new one ");
      return;
    }
    console.log(
      `Dropping ${getActivePlayer().name}'s mark on index ${position}`,
    );
    Gameboard.putMark(position, getActivePlayer());
    Gameboard.printBoard();
    console.log(CheckWin(getActivePlayer()));
    switchPlayerTurn();
  };

  return { playRound };
})();

const playerSeq = [2, 0, 4, 1, 6, 7];

playerSeq.forEach((num) => {
  GameController.playRound(num);
});

const boardArr = Gameboard.GetBoard().map((cell) => cell.getMark());
console.log(boardArr);
