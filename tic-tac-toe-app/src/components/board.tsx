import React from 'react'
import { Square } from '../functions/square'

export type board = Array<string | null>

type Props = {
  squares: board
  onClick: (_: number) => void
}

export const Board: React.FunctionComponent<Props> = (
  {squares, onClick}: Props
) => {
  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => onClick(i)} />
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
