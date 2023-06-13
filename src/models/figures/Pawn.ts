import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Queen } from "./Queen";

export class Pawn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
          return false;
      
        const dx = target.x - this.cell.x;
        const dy = target.y - this.cell.y;
        const forwardDir = this.color === Colors.BLACK ? 1 : -1;
      
        switch (true) {
          case dx === 0 && dy === forwardDir && target.isEmpty():
            return true;
          case dx === 0 && dy === forwardDir * 2 && target.isEmpty() && this.cell.board.getCell(this.cell.x, this.cell.y + forwardDir).isEmpty():
            return true;
          case Math.abs(dx) === 1 && dy === forwardDir && !target.isEmpty():
            return true;
          default:
            return false;
        }
      }

      moveFigure(target: Cell) {
        super.moveFigure(target);
        if(target.y === target.board.cells.length - 1 || target.y === 0) {
          target.figure = new Queen(this.color, this.cell);
        }
      }
      
}