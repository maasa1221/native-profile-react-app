import { createAppContainer, createStackNavigator } from 'react-navigation';
import React from 'react';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { createStore,applyMiddleware,compose, } from 'redux'
import reducer from './src/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { verifyCredentials } from "./src/config/redux-token-auth-config"


const store = createStore(reducer,applyMiddleware(thunk))
verifyCredentials(store)

const AppNavigator = createStackNavigator({
  Login:      { screen: LoginScreen },
  Signup:     { screen: SignupScreen },
  Home:       { screen: MemoListScreen },
  MemoDetail: { screen: MemoDetailScreen },
  MemoEdit:   { screen: MemoEditScreen },
  MemoCreate: { screen: MemoCreateScreen },
}, {
  defaultNavigationOptions: {
    title: 'プロフィール管理',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#00ccff',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});
AppContainer = createAppContainer(AppNavigator);
class App extends React.Component {
  
  render() {
    return (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
