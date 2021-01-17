import {
    COMPLETE_TOUR,
    DO_TOUR,
    RESET_TOUR,
    SKIP_TOUR
} from '../../actions/accountActions/types';
import { IAction } from '.'

type skipTour = boolean | undefined;

const initState = {
    skipTour: undefined
}

const authReducer = (state = initState, action: IAction) => {
    // destructure action
    const { type, payload } = action;

    switch (type) {
        case COMPLETE_TOUR:
            return {
                ...state,
                skipTour: payload.skipTour
            };
        case DO_TOUR:
            return {
                ...state,
                skipTour: payload.skipTour
            };
        case RESET_TOUR:
            return {
                ...state,
                skipTour: payload.skipTour
            };
        case SKIP_TOUR:
            return {
                ...state,
                skipTour: payload.skipTour
            };
        default:
            return state;
    }
};

export default authReducer;
