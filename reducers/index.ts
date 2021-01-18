import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    accountReducer,
    authReducer
} from './children';

export const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
