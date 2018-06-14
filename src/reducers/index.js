import {combineReducers} from 'redux';
import counterState from './counterState';
import configState from './configState';

export default combineReducers({
    counterState,
    configState
});