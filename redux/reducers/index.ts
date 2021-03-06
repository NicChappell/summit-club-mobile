import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  accountReducer,
  authReducer,
  errorReducer,
  featuresReducer,
  searchReducer,
  summitsReducer,
  userReducer,
} from "./children";

export const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  error: errorReducer,
  features: featuresReducer,
  search: searchReducer,
  summits: summitsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// TODO: IF I TYPE THINGS CORRECTLY, I SHOULDN'T NEED TO EXPORT THESE TYPES?!?!?
export { IAccountState } from "./children/accountReducer/types";
export { IAuthState } from "./children/authReducer/types";
export { IErrorState } from "./children/errorReducer/types";
export { IFeaturesState } from "./children/featuresReducer/types";
export { ISearchState } from "./children/searchReducer/types";
export { ISummitsState } from "./children/summitsReducer/types";
export { IUserState } from "./children/userReducer/types";
