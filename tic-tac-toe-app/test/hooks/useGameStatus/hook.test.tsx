import {
    useGameStatus
} from '../../../src/hooks/useGameStatus/hook'
import { renderHook, act } from '@testing-library/react-hooks'
import React from 'react';


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

    test('call handleClick', () => {
        act(() => {
            result.current.handleClick(1)
        })

        expect(result.current.state).toStrictEqual({
            "history": [{squares: Array(9).fill(null)}, {squares: [null, 'X', null, null, null, null, null, null, null]}],
            "xIsNext": false,
            "stepNumber": 1
        })
    })

    test('call jumpTo', () => {
        const mock = jest.fn()
        beforeEach(() => {
            const state = {
                history: [{squares: Array(9).fill(null)}, {squares: [null, 'X', null, null, null, null, null, null, null]}],
                xIsNext: false,
                stepNumber: 1
            }
            jest.spyOn(React, 'useState').mockImplementationOnce(() => [state, mock])
        })

        act(() => {
            result.current.jumpTo(0)
        })

        expect(result.current.state).toStrictEqual({
            "history": [{squares: Array(9).fill(null)}],
            "xIsNext": true,
            "stepNumber": 0
        })
    })
})

