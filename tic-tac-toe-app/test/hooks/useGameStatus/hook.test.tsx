import {
    useGameStatus
} from '../../../src/hooks/useGameStatus/hook'
import { renderHook } from '@testing-library/react-hooks'



describe('useGameStatus', () => {
    let result: any;

    beforeEach(() => {
        result = renderHook(() => useGameStatus()).result
    })

    test('check init value', () => {
        expect(result.current.board).toMatchSnapshot()
        expect(result.current.sentence).toBe("Next player: X")
        expect(<>{result.current.moves}</>).toMatchSnapshot()
    })
})

