import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';

import Navigation from './navigation'
import store from './store';

// export const AuthContext = React.createContext();

// const reducer = (prevState, action) => {
//     switch (action.type) {
//         case 'RESTORE_TOKEN':
//             return {
//                 ...prevState,
//                 userToken: action.token,
//                 isLoading: false,
//             };
//         case 'SIGN_IN':
//             return {
//                 ...prevState,
//                 isSignout: false,
//                 userToken: action.token,
//             };
//         case 'SIGN_OUT':
//             return {
//                 ...prevState,
//                 isSignout: true,
//                 userToken: null,
//             };
//     }
// };

// const initState = {
//     isLoading: true,
//     isSignout: false,
//     userToken: null,
// };

const App = () => {
    // // reducer hooks
    // const [state, dispatch] = React.useReducer(reducer, initState);

    // // effect hooks
    // React.useEffect(() => {
    //     // fetch the token from storage then navigate to our appropriate place
    //     const bootstrapAsync = async () => {
    //         let userToken;

    //         try {
    //             userToken = await AsyncStorage.getItem('userToken');
    //         } catch (error) {
    //             // restoring token failed
    //             console.log(error);
    //         }

    //         // validate user token
    //         // TODO

    //         // update state to switch screens
    //         dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    //     };

    //     bootstrapAsync();
    // }, []);

    // // memo hooks
    // const authContext = React.useMemo(
    //     () => ({
    //         signIn: async data => {
    //             // In a production app, we need to send some data (usually username, password) to server and get a token
    //             // We will also need to handle errors if sign in failed
    //             // After getting token, we need to persist the token using `AsyncStorage`
    //             // In the example, we'll use a dummy token

    //             dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    //         },
    //         signOut: () => dispatch({ type: 'SIGN_OUT' }),
    //         signUp: async data => {
    //             // In a production app, we need to send user data to server and get a token
    //             // We will also need to handle errors if sign up failed
    //             // After getting token, we need to persist the token using `AsyncStorage`
    //             // In the example, we'll use a dummy token

    //             dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    //         },
    //     }),
    //     []
    // );

    return (
        // <AuthContext.Provider value={authContext}>
        <Provider store={store}>
            <SafeAreaProvider>
                <Navigation />
            </SafeAreaProvider>
        </Provider>
        // </AuthContext.Provider>
    );
};

export default App;
