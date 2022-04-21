import React from 'react'
import { useGameStatus } from '../hooks/useGameStatus/hook'



export const Game: React.FunctionComponent = () => {
  const { board, sentence, moves } = useGameStatus()

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
