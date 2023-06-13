import {Board} from "../models/Board.ts";
import React, {FC} from "react";
import CellComponent from "./CellComponent.tsx";
import { useState, useEffect } from 'react';
import { Cell } from "../models/Cell.ts";
import Player from "../models/Player.ts";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            swapPlayer();
        } else if(!selectedCell && cell.figure !== null && currentPlayer?.color === cell.figure.color) {
            setSelectedCell(cell);
        } else if(selectedCell && cell.figure !== null && currentPlayer?.color === cell.figure.color) {
            setSelectedCell(cell);
        } else {
            setSelectedCell(null);
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
        <h3>Текущий игрок {currentPlayer?.color}</h3>
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
        </div>
    );
};

export default BoardComponent;