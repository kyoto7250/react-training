import {
    showSentence
} from '../../../src/hooks/useGameStatus/utils'

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
