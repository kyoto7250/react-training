import { board } from "../../components/board";
import { calculateWinner } from "../../functions/calculateWinner";


export const generateNextState = (i: number, history:  Array<{ squares: board }>, stepNumber: number, xIsNext: boolean) => {
    const h = history.slice(0, stepNumber + 1)
    const current = h[h.length - 1]
    if (calculateWinner(current.squares) || current.squares[i] != null) {
        return null
    }
    const next_squares = current.squares.slice()
    const sign = xIsNext ? 'X' : 'O'
    next_squares[i] = sign

    const next_history = h.concat([{ squares: next_squares }])

    return {history: next_history, xIsNext: !xIsNext, stepNumber: h.length}
} 
