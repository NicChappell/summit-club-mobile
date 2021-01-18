import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThunk } from '../../reducers';
import {
    COMPLETE_TOUR,
    DO_TOUR,
    RESET_TOUR,
    SKIP_TOUR
} from './types';

export const checkTour = (): AppThunk => async dispatch => {
    // retrieve tour status from async storage
    const tourStatus = await AsyncStorage.getItem('tourStatus');

    if (tourStatus === 'complete') {
        // update state to render home screen
        dispatch({ type: SKIP_TOUR, payload: { skipTour: true } });
    } else {
        // update state to render tour screen
        dispatch({ type: DO_TOUR, payload: { skipTour: false } });
    }
}

export const completeTour = (): AppThunk => async dispatch => {
    // update tour status in async storage
    await AsyncStorage.setItem('tourStatus', 'complete');

    // update state to render home screen
    dispatch({ type: COMPLETE_TOUR, payload: { skipTour: true } })
};

export const resetTour = (): AppThunk => async dispatch => {
    // update tour status in async storage
    await AsyncStorage.setItem('tourStatus', 'incomplete');

    // update state to render tour screen
    dispatch({ type: RESET_TOUR, payload: { skipTour: false } });
};
