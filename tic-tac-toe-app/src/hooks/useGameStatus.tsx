import { useState, useCallback } from 'react'
import { board, Board } from "../components/board";
import { calculateWinner } from "../functions/calculateWinner";

type GameState = {
  history: Array<{ squares: board }>
  xIsNext: boolean
  stepNumber: number
}

const showSentence = (squares: board, xIsNext: boolean) => {
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

const showMove = (history: Array<{squares: board}>, jumpTo: (_: number) => void) => {
  const move = history.map((_, move) => {
    const desc = move ? 'Go to move #' + String(move) : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return move
}

export const useGameStatus = () => {
  const [state, setState] = useState<GameState>({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  })

  function handleClick(i: number) {
    const history = state.history.slice(0, state.stepNumber + 1)
    const current = history[history.length - 1]
    if (calculateWinner(current.squares) || current.squares[i] != null) {
      return
    }
    const next_squares = current.squares.slice()
    const sign = state.xIsNext ? 'X' : 'O'
    next_squares[i] = sign

    const next_history = history.concat([{ squares: next_squares }])
    updateState({
      history: next_history,
      xIsNext: !state.xIsNext,
      stepNumber: history.length,
    })
  }

  function jumpTo(step: number) {
    updateState({
      history: state.history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  const updateState = useCallback((state: GameState) => {
    setState({
      history: state.history,
      xIsNext: state.xIsNext,
      stepNumber: state.stepNumber
    })
  }, [])

  const history = state.history
  const current = history[state.stepNumber]
  const sentence = showSentence(current.squares, state.xIsNext)
  const moves = showMove(history, jumpTo)
  const board = <Board squares={current.squares} onClick={(i) => handleClick(i)} />


  return { board, sentence, moves }
}
