import { combineReducers } from 'redux';
import {
    accountReducer,
    authReducer
} from './children';

export default combineReducers({
    account: accountReducer,
    auth: authReducer
});
