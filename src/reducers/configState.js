import * as types from '../actions/actionTypes';

const initialState = {
    baseurl: '',
    apiurl: '',
    token: ''
};

export default function configState(state=initialState, action){
    switch (action.type){
        case types.UPDATE_BASE_URL:
            return Object.assign({}, state, {
                baseurl: action.payload
            });
        case types.UPDATE_API_URL:
            return Object.assign({}, state, {
                apiurl: action.payload
            });
        case types.UPDATE_TOKEN:
            return Object.assign({}, state, {
                token: action.payload
            });

        default:
            return state;
    }
}
