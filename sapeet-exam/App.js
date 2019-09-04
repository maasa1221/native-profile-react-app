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

const store = createStore(reducer,applyMiddleware(thunk))

const AppNavigator = createStackNavigator({
  Login:      { screen: MemoListScreen },
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
      backgroundColor: '#265366',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});
AppContainer = createAppContainer(AppNavigator);
class App extends React.Component {
  constructor(props) {
    super(props);
}
  render() {
    return (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
