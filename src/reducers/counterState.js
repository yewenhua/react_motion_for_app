import * as types from '../actions/actionTypes';

const initialState = {
    counter: 0
};

export default function counterState(state=initialState, action){
    switch (action.type){
        case types.COUNTER_INCREMENT:
            return Object.assign({}, state, {
                counter: state.counter + action.payload
            });

        case types.COUNTER_DOUBLE_ASYNC:
            return Object.assign({}, state, {
                counter: state.counter * 2
            });

        default:
            return state;
    }
}
