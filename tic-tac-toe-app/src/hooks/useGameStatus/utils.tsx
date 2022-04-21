import { board } from "../../components/board";
import { calculateWinner } from "../../functions/calculateWinner";

export const showSentence = (squares: board, xIsNext: boolean) => {
    let status = ''
    if (calculateWinner(squares)) {
        const winner = xIsNext ? 'O' : 'X'
        status = `Winner is ${winner}`
    } else {
        const turn = xIsNext ? 'X' : 'O'
        status = `Next player: ${turn}`
    }

    return status
}

export const showMove = (history: Array<{squares: board}>, jumpTo: (_: number) => void) => {
    return history.map((_, move) => {
        const desc = move ? 'Go to move #' + String(move) : 'Go to game start'
        return (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
        )
    })
}

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
