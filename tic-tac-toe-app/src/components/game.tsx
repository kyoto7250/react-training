import React from 'react'
import { useGameStatus } from '../hooks/useGameStatus'
import { board, Board } from './board'
import { calculateWinner } from '../functions/calculateWinner'


const showState = (squares: board, xIsNext: boolean) => {
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

export const Game: React.FunctionComponent = () => {
  const { state, updateState } = useGameStatus()
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

  const history = state.history
  const current = history[state.stepNumber]

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + String(move) : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{showState(current.squares, state.xIsNext)}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
