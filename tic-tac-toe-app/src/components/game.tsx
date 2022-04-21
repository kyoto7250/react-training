import React from 'react'
import { useGameStatus } from '../hooks/useGameStatus'
import { board, Board } from './board'
import { calculateWinner } from '../functions/calculateWinner'


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

export const Game: React.FunctionComponent = () => {
  const { state, jumpTo, handleClick } = useGameStatus()
  const history = state.history
  const current = history[state.stepNumber]

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{showSentence(current.squares, state.xIsNext)}</div>
        <ol>{showMove(history, jumpTo)}</ol>
      </div>
    </div>
  )
}
