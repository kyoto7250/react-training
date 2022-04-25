import React from 'react'
import { useGameStatus } from '../hooks/useGameStatus/hook'
import { board, Board } from "../components/board";
import { calculateWinner } from "../functions/calculateWinner";


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
