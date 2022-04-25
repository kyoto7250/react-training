import { generateNextState
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
