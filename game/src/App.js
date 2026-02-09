import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const win = calculateWinner(newSquares);
    if (win) setWinner(win);
    else if (!newSquares.includes(null)) setWinner("Draw");
  };

  useEffect(() => {
    if (winner && winner !== "Draw") {
      setShowPopup(true);
    }
  }, [winner]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setShowPopup(false);
  };

  const goBack = () => {
    resetGame();
    setGameStarted(false);
  };

  const calculateWinner = (s) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (s[a] && s[a] === s[b] && s[a] === s[c]) return s[a];
    }
    return null;
  };

  const getWinnerName = () => {
    if (winner === "X") return playerX;
    if (winner === "O") return playerO;
    return "";
  };

  return (
    <>
      <div className="card">
         <h1 className="game-title"><b>Tic Tac Toe</b></h1>
        {!gameStarted ? (
          <>
            <h2 className="title">Enter Player Names</h2>

            <input
              className="input"
              type="text"
              placeholder="Player X Name"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
            />

            <input
              className="input"
              type="text"
              placeholder="Player O Name"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
            />

            <button
              className="start"
              onClick={() => setGameStarted(true)}
              disabled={!playerX || !playerO}
            >
              Start Game
            </button>
          </>
        ) : (
          <>
            <div className="status">
              {winner
                ? winner === "Draw"
                  ? "Draw!"
                  : `Winner: ${getWinnerName()}`
                : `Next Player: ${xIsNext ? playerX : playerO}`}
            </div>

            <div className="board">
              {squares.map((val, idx) => (
                <button
                  key={idx}
                  className={`square ${
                    val === "X" ? "x" : val === "O" ? "o" : ""
                  }`}
                  onClick={() => handleClick(idx)}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="buttons">
              <button id="reset" onClick={resetGame}>
                Reset
              </button>
              <button className="back" onClick={goBack}>
                Back
              </button>
            </div>
          </>
        )}
      </div>

      {/* Winner Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>🎉 Congratulations 🎉</h2>
            <p>{getWinnerName()} wins the game!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
