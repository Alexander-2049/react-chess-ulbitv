import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    isKingValidMove(target: Cell): boolean {
        const validMoves = [
            {x: +1, y: +1},
            {x: +1, y: -1},
            {x: +1, y: 0},
            {x: 0, y: +1},
            {x: 0, y: -1},
            {x: -1, y: +1},
            {x: -1, y: -1},
            {x: -1, y: 0}
        ]

        for(let i = 0; i < validMoves.length; i++) {
            const {x, y} = validMoves[i];
            if(target.x === this.cell.x + x && target.y === this.cell.y + y)
                return true;
        }
        return false;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;

        if(!this.isKingValidMove(target)) return false;

        return true;
    }
}