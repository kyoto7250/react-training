import { generateNextState, showSentence
} from '../../../src/hooks/useGameStatus/utils'


describe("generateNextState", () => {
    describe("next", () => {
        const i = 1
        const stepNumber = 0
        const xIsNext = false
        const history = [
            {squares: Array(9).fill(null)},
        ]

        const output = generateNextState(i, history, stepNumber, xIsNext)

        test('next state', () => {
            expect(output?.stepNumber).toBe(1)
            expect(output?.xIsNext).toBe(true)
            expect(output?.history).toStrictEqual([
                {squares: Array(9).fill(null)},
                {squares: [null, "O", null, null, null, null, null, null, null]},
            ])
        });
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
