import {useMemo, useReducer} from 'react';
import {GetDetailUmkm} from '../handler/UmkmHandler';

const initialState = {
  userDetail: null,
  error: null,
  isLoading: true,
};

const ACTIONS = {
  GET_USER_DETAIL: 'GET_USER_DETAIL',
  ERROR: 'ERROR',
  IS_LOADING: 'IS_LOADING',
};

const userDetailReducer = (prevState, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER_DETAIL:
      return {
        ...prevState,
        userDetail: action.userDetail,
        error: null,
        isLoading: false,
      };
    case ACTIONS.ERROR:
      return {
        ...prevState,
        isLoading: false,
        error: action.error,
      };
    case ACTIONS.IS_LOADING:
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
    default:
      return prevState;
  }
};

const DetailUserContext = () => {
  const [userState, dispatch] = useReducer(userDetailReducer, initialState);

  const userContext = useMemo(
    () => ({
      getUserDetail: async id => {
        //functionnya
        dispatch({type: ACTIONS.IS_LOADING, isLoading: true});
        try {
          const resUser = await GetDetailUmkm(id);
          console.log('resUser', resUser);
          dispatch({
            type: ACTIONS.GET_USER_DETAIL,
            userDetail: resUser,
          });
          dispatch({type: ACTIONS.IS_LOADING, isLoading: false});
          return Promise.resolve(resUser);
        } catch (error) {
          console.log('err di depan', error);

          // if (error.toString().includes('400')) {
          dispatch({type: ACTIONS.ERROR, error: error});
          dispatch({type: ACTIONS.IS_LOADING, isLoading: false});
          // }
          return Promise.reject(error);
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {userState, userContext};
};

export default DetailUserContext;
