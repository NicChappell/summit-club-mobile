import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  accountReducer,
  authReducer,
  errorReducer,
  featuresReducer,
  searchReducer,
  userReducer,
} from "./children";

export const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  error: errorReducer,
  features: featuresReducer,
  search: searchReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
