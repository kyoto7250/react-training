import { Game } from '../../src/components/game'
import { render } from '@testing-library/react'
import { useGameStatus } from '../../src/hooks/useGameStatus/hook'
jest.mock('../../src/hooks/useGameStatus/hook')

describe('Game', () => {
  describe('snapshot', () => {
    beforeEach(() => {
      (useGameStatus as jest.Mock).mockImplementation(
        () => ({
          state: {
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0
          },
          jumpTo: (_: number) => {},
          handleClick: (_: number) => {}
        })
      );
    });

    test('initial snapshot', () => {
      const game = render(<Game />)
      expect(game).toMatchSnapshot()
    })


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
            handleClick: (_: number) => {}
          })
        );
      });

      test('mock snapshot', () => {
        const game = render(<Game />)
        expect(game).toMatchSnapshot()
      })
    })
  })
})
