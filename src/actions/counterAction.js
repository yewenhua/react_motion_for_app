'use strict';

import * as TYPES from './actionTypes';

export function increment (value = 1) {
    return {
        type    : TYPES.COUNTER_INCREMENT,
        payload : value
    }
}

export const doubleAsync = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type    : TYPES.COUNTER_DOUBLE_ASYNC,
                    payload : getState().counterState.counter
                })
                resolve()
            }, 200)
        })
    }
}