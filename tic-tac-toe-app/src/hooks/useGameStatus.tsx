import { useState, useCallback } from 'react'
import { board } from "../components/board";
import { calculateWinner } from "../functions/calculateWinner";

type GameState = {
  history: Array<{ squares: board }>
  xIsNext: boolean
  stepNumber: number
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
  return { state, jumpTo, handleClick }
}
