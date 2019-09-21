import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Thumbnail } from 'native-base'
import CircleButton from '../elements/CircleButton';
import styled from 'styled-components';
import {mapStateToProps, mapDispatchToProps} from '../actions';
import { connect,} from 'react-redux';
const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

const dateString = (date) => {
  const str = date;
  return str.split('T')[0];
};

class MemoDetailScreen extends React.Component {
  state = {
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState(params);
  }
  returnMemo(memo) {
    this.setState({ memo });
  }

  render() {
    const { memo } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.memoHeader}>
            <View>
              <Text style={styles.memoHeaderTitle}>{memo.name.substring(0, 10)}</Text>
              <Text style={styles.memoHeaderDate}>{dateString(memo.updated_at)}</Text>
            </View>
          </View>
        </View>

        <Textout>
        名前
        </Textout>
        <Textin>{memo.name}</Textin>
        <Textout>
        性別
        </Textout>
        <Textin>{memo.sex==false ? "男" : "女"}</Textin>
        <Textout>
        身長
        </Textout>
        <Textin>{memo.height+"cm"}</Textin>
        <Textout>
        年齢
        </Textout>
        <Textin>{memo.age+"才"}</Textin>
        <Textout>
        プロフィール画像
        </Textout>
        <Photo>
        <Thumbnail large source={{uri: memo.my_photo_bool==true? `https://sapeetapp.s3-ap-northeast-1.amazonaws.com/uploads/image${memo.name}.jpg` : tempAvatar}}/>
        </Photo>
        <CircleButton
          name="pencil"
          color="white"
          
          style={styles.editButton}
          onPress={() => {this.props.navigation.navigate('MemoEdit', { ...memo, returnMemo: this.returnMemo.bind(this),memo:memo }); }}
        />
      </View>
    );
  }
}




const Textout = styled.Text`
  fontSize: 15px;
  margin-left: 5px;
  margin-top: 5px;
`;

const Textin = styled.Text`
  fontSize: 15px;
  margin: 10px; 
`;

const Photo = styled.View`
  margin: 10px; 
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoHeader: {
    height: 100,
    backgroundColor: '#00ccff',
    justifyContent: 'center',
    padding: 10,
  },
  memoHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  memoHeaderDate: {
    fontSize: 12,
    color: '#fff',
  },
  memoContent: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  memoBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  editButton: {
    top: 75,
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoDetailScreen)
