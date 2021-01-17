import { combineReducers } from 'redux';
import {
    accountReducer,
    authReducer
} from './children';

export const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>
