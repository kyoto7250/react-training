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
        expect(result.current.state).toStrictEqual({
            "history": [{squares: Array(9).fill(null)}],
            "xIsNext": true,
            "stepNumber": 0
        })
    })
})

