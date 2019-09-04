import React from 'react';
import { StyleSheet, View } from 'react-native';
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';
import { getPost　} from '../actions'
import { connect,} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../actions';
class MemoListScreen extends React.Component {
  state = {
    profile:[],
  }

  componentWillMount() {
    this.setState({profile: this.props.getProfile()})
    /*axios.get('http://localhost:3001/profiles')
    .then((results) => {
      console.log(results)
      this.setState({profile: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })*/
    
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


export default connect(mapStateToProps, mapDispatchToProps)(MemoListScreen)