import { useState, useCallback } from 'react'
import { board } from "../../components/board";
import { generateNextState } from './utils';

type GameState = {
    history: Array<{ squares: board }>
    xIsNext: boolean
    stepNumber: number
}

export const useGameStatus = () => {
    const [state, setState] = useState<GameState>({
        history: [{ squares: Array(9).fill(null) }],
        xIsNext: true,
        stepNumber: 0,
    })

    const updateState = useCallback((state: GameState) => {
        setState({
        history: state.history,
        xIsNext: state.xIsNext,
        stepNumber: state.stepNumber
        })
    }, [])

    function handleClick(i: number) {
        const x = generateNextState(i, state.history, state.stepNumber, state.xIsNext);
        if (x !== null) {
        updateState({
            history: x.history,
            xIsNext: x.xIsNext,
            stepNumber: x.stepNumber,
        })
        }
    }

    function jumpTo(step: number) {
        updateState({
            history: state.history,
            stepNumber: step,
            xIsNext: step % 2 === 0,
        })
    }

    return { state, jumpTo, handleClick }
}
