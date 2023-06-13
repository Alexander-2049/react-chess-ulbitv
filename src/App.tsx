import './App.css';
import BoardComponent from './components/BoardComponent';
import {useEffect, useState} from "react";
import {Board} from "./models/Board.ts";
import Player from './models/Player.ts';
import { Colors } from './models/Colors.ts';

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
    }, [])
    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setWhitePlayer(new Player(Colors.WHITE));
        setBlackPlayer(new Player(Colors.BLACK));
        setCurrentPlayer(whitePlayer);
    }

    function swapPlayer() {
      setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

  return (
    <div className="app">
      <button onClick={restart}>restart</button>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
    </div>
  )
}

export default App
