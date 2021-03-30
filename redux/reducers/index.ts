import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  accountReducer,
  authReducer,
  errorReducer,
  featuresReducer,
} from "./children";

export const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  error: errorReducer,
  features: featuresReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
