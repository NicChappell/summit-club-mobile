export { default as accountReducer } from './accountReducer';
export { default as authReducer } from './authReducer';

export interface IAction {
    type: string;
    payload: any;
};