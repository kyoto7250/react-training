import { useState, useCallback } from 'react'
import { board } from "../components/board";

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

  const updateState = useCallback((state: GameState) => {
    setState({
      history: state.history,
      xIsNext: state.xIsNext,
      stepNumber: state.stepNumber
    })
  }, [])
  return { state, updateState }
}
