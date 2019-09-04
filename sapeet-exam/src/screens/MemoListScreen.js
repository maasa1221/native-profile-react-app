import React from 'react';
import { StyleSheet, View } from 'react-native';

import firebase from 'firebase';
import axios from 'axios'
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';
// import { get } from 'https';
// import console = require('console');

class MemoListScreen extends React.Component {
  state = {
    profile:[],
  }

  componentWillMount() {
    /*const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/profile`)
    .onSnapshot((snapshot) => {
      const proList = [];
        snapshot.forEach((doc) => {
          proList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({proList});
    });*/
    axios.get('http://localhost:3001/profiles')
    .then((results) => {
      console.log(results)
      this.setState({profile: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })
    
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
    <View style={styles.container}>
      <MemoList memoList={this.state.profile} navigation={this.props.navigation} />
      <CircleButton name="plus" onPress={this.handlePress.bind(this)}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFDF6',
  },
});

export default MemoListScreen;
