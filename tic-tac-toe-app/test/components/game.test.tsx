
import { Game, showSentence, showMove } from '../../src/components/game'
import { render, act } from '@testing-library/react'
import { useGameStatus } from '../../src/hooks/useGameStatus/hook'
jest.mock('../../src/hooks/useGameStatus/hook')

describe('Game', () => {
  describe('snapshot', () => {
    describe('initial state', () => {
      beforeEach(() => {
        (useGameStatus as jest.Mock).mockImplementation(
          () => ({
            state: {
              history: [{squares: Array(9).fill(null)}],
              xIsNext: true,
              stepNumber: 0
            },
            jumpTo: (_: number) => {},
            placePiece: (_: number) => {}
          })
        );
      });
  
      test('check snapshot', () => {
        const game = render(<Game />)
        expect(game).toMatchSnapshot()
      })
    });

    describe('mock snapshot', () => {
      beforeEach(() => {
        (useGameStatus as jest.Mock).mockImplementation(
          () => ({
            state: {
              history: [{squares: Array(9).fill(null)}, {squares: [null, 'X', null, null, null, null, null, null, null]}],
              xIsNext: false,
              stepNumber: 1
            },
            jumpTo: (_: number) => {},
            placePiece: (_: number) => {}
          })
        );
        test('mock snapshot', () => {
          const game = render(<Game />)
          expect(game).toMatchSnapshot()
        })
      });
    })
  })
})


describe('showSentence', () => {
  describe('not decided winner', () => {
      const square = Array(9).fill(null)
      test('Next Player is X', () => {
          expect(showSentence(square, true)).toBe("Next player: X")
      })

      test('Next Player is O', () => {
          expect(showSentence(square, false)).toBe("Next player: O")
      })
  })

  describe('decided winner', () => {
      test('Winner is X', () => {
          const square = Array(9).fill('X')
          let value = showSentence(square, false)
          expect(value).toBe("Winner is X")
      })

      test('Winner is O', () => {
          const square = Array(9).fill('O')
          let value = showSentence(square, true)
          expect(value).toBe("Winner is O")
      })
  })
})


describe("showMove", () => {
  const history = [
      {squares: Array(9).fill(null)},
      {squares: Array(9).fill('X')},
      {squares: Array(9).fill('O')},
  ]
  const jumpTo = jest.fn(x => {})

  describe("snapshot test", () => {
      const result = render(<>{showMove(history, jumpTo)}</>)
      expect(result).toMatchSnapshot()
  })

  describe("act", () => {
      const result = render(<>{showMove(history, jumpTo)}</>)
      const button  = result.getAllByRole("button")[0]
      act(() => {
          button.dispatchEvent(new MouseEvent("click", { bubbles: true}))
      })
      expect(jumpTo.mock.calls.length).toBe(1)
  })
})
