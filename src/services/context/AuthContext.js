import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMemo, useReducer} from 'react';
import {LoginHandler, RefreshTokenHandler} from 'services/handler/AuthHandler';

const initialState = {
  dataSignIn: {},
  token: null,
  error: null,
  isLoading: true,
};

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RETRIEVE_TOKEN: 'RETRIEVE_TOKEN',
  CHECK_AUTH: 'CHECK_AUTH',
  ERROR: 'ERROR',
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...prevState,
        dataSignIn: action.dataSignIn,
        token: action.token,
        error: null,
        isLoading: false,
      };
    case ACTIONS.LOGOUT:
      return {
        ...prevState,
        dataSignIn: action.dataSignIn,
        token: null,
        error: null,
        isLoading: false,
      };
    case ACTIONS.RETRIEVE_TOKEN:
      return {
        ...prevState,
        token: action.token,
        dataSignIn: action.dataSignIn,
        error: null,
        isLoading: false,
      };
    case ACTIONS.CHECK_AUTH:
      return {
        ...prevState,
        token: action.token,
        dataSignIn: action.dataSignIn,
        error: null,
        isLoading: false,
      };
    case ACTIONS.ERROR:
      return {
        ...prevState,
        isLoading: false,
        error: action.error,
      };
    default:
      return prevState;
  }
};

const AuthContext = () => {
  const [authState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        //functionnya
        try {
          const resLoginHandler = await LoginHandler(email, password);
          console.log('resloginhandler', resLoginHandler);
          dispatch({
            type: ACTIONS.LOGIN,
            dataSignIn: resLoginHandler,
            token: resLoginHandler.token,
          });
          return Promise.resolve(resLoginHandler);
        } catch (error) {
          console.log('err di depan', error);

          // if (error.toString().includes('400')) {
          dispatch({type: ACTIONS.ERROR, error: error});
          // }
          return Promise.reject(error);
        }
      },
      signOut: async () => {
        //functionnya
        await AsyncStorage.removeItem('@user_bina');
        await AsyncStorage.removeItem('@refresh_token_bina_umkm');
        dispatch({
          type: ACTIONS.LOGOUT,
          dataSignIn: {
            ...authState.dataSignIn,
            token: null,
            refresh_token: null,
          },
        });
      },
      restoreToken: async () => {
        try {
          const resToken = await AsyncStorage.getItem('@user_bina');
          const resRefToken = await AsyncStorage.getItem(
            '@refresh_token_bina_umkm',
          );

          const response = await RefreshTokenHandler(resToken, resRefToken);
          setTimeout(() => {
            dispatch({
              type: ACTIONS.RETRIEVE_TOKEN,
              dataSignIn: response,
              token: response.access_token,
            });
          }, 2500);
          console.log('restore token', response);
        } catch (error) {
          setTimeout(() => {
            dispatch({type: ACTIONS.ERROR, error: error});
          }, 2500);

          console.log('err retoretoken', error);
        }
      },
      checkAuth: async () => {
        try {
          const resUser = await AsyncStorage.getItem('@user_bina');
          console.log('ressUserStrg', resUser);
          setTimeout(() => {
            dispatch({
              type: ACTIONS.CHECK_AUTH,
              dataSignIn: resUser === null ? null : JSON.parse(resUser),
              token: resUser === null ? null : JSON.parse(resUser),
            });
          }, 2500);
        } catch (error) {
          setTimeout(() => {
            dispatch({type: ACTIONS.ERROR, error: error});
          }, 2500);
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {authState, authContext};
};

export default AuthContext;
