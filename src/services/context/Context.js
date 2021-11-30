import {NavigationContainer} from '@react-navigation/native';
import React, {createContext} from 'react';
import Routes from '../../routes/Routes';
import AuthContext from './AuthContext';
import DetailUserContext from './DetailUserContext';

export const AppContext = createContext();

const Context = () => {
  const {authState, authContext} = AuthContext();
  const {userState, userContext} = DetailUserContext();

  const allState = {authState, userState};
  const allFunction = {authContext, userContext};

  return (
    <AppContext.Provider value={{state: allState, func: allFunction}}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default Context;
