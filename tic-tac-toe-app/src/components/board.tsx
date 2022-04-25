import React from 'react'
import { Square } from '../functions/square'

export type board = Array<string | null>

type Props = {
  squares: board
  onClick: (_: number) => void
}

const renderSquare = (i: number, squares: board, onClick: (_: number) => void) => {
  return <Square value={squares[i]} onClick={() => onClick(i)} />
}

export const Board: React.FunctionComponent<Props> = (
  {squares, onClick}: Props
) => {
  return (
    <div>
      <div className="board-row">
        {renderSquare(0, squares, onClick)}
        {renderSquare(1, squares, onClick)}
        {renderSquare(2, squares, onClick)}
      </div>
      <div className="board-row">
        {renderSquare(3, squares, onClick)}
        {renderSquare(4, squares, onClick)}
        {renderSquare(5, squares, onClick)}
      </div>
      <div className="board-row">
        {renderSquare(6, squares, onClick)}
        {renderSquare(7, squares, onClick)}
        {renderSquare(8, squares, onClick)}
      </div>
    </div>
  )
}
