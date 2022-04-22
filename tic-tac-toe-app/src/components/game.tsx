import React from 'react'
import { useGameStatus } from '../hooks/useGameStatus/hook'
import { showSentence, showMove } from '../hooks/useGameStatus/utils'
import { Board } from "../components/board";


export const Game: React.FunctionComponent = () => {
  const { state, jumpTo, handleClick } = useGameStatus()
  const current = state.history[state.stepNumber]
  const moves = showMove(state.history, jumpTo)
  const sentence = showSentence(current.squares, state.xIsNext)
  const board = <Board squares={current.squares} onClick={(i) => handleClick(i)} />

  return (
    <div className="game">
      <div className="game-board">
        {board}
      </div>
      <div className="game-info">
        <div>{sentence}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
