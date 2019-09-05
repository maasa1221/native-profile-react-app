import React from 'react';
import { StyleSheet, View } from 'react-native';
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';
import { connect,} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../actions';

class MemoListScreen extends React.Component {
  componentWillMount(){
    this.props.getProfile()
  }
  /*componentDidUpdate(){
    this.props.getProfile()
  }*/
  render() {
    
    return (
        <View style={styles.container}>
          <MemoList memoList={this.props.profile} navigation={this.props.navigation} />
          <CircleButton name="plus" onPress={ () => this.props.navigation.navigate('MemoCreate', { refresh: this.componentWillMount.bind(this)}) }/>
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