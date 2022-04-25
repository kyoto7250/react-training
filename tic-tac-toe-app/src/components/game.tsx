import React from 'react'
import { useGameStatus } from '../hooks/useGameStatus/hook'
import { board, Board } from "../components/board";


export const Game: React.FunctionComponent = () => {
  const { state, sentence, jumpTo, placePiece } = useGameStatus()
  const current = state.history[state.stepNumber]
  const moves = showMove(state.history, jumpTo)
  const board = <Board squares={current.squares} onClick={(i) => placePiece(i)} />

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

export const showMove = (history: Array<{squares: board}>, jumpTo: (_: number) => void) => {
  return (
    <>
      {
        history.map((_, move) => {
          const desc = move ? 'Go to move #' + String(move) : 'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
          );
        })
      }
    </>
  );
}
