import React from 'react';
import { Container, Content, Header, Left, Button, Item, Input, Badge,Thumbnail } from 'native-base'

import { StyleSheet, View, Text, TouchableHighlight, FlatList} from 'react-native';
import styled from 'styled-components';

const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

class MemoList extends React.Component {
  renderList({ item }) {
    return (
      <TouchableHighlight onPress={() => { this.props.navigation.navigate('MemoDetail', { memo: item }); }}>
          <View style={styles.memoListItem}>
            <Thumbnail large source={{uri: item.my_photo_bool==true? `https://sapeetapp.s3-ap-northeast-1.amazonaws.com/uploads/image${item.name}.jpg` : tempAvatar}} style={styles.avatar}/>
            <Textname>{item.name.substring(0, 10)}</Textname>
            <Textdate>{"最終更新"+item.updated_at.substring(0, 10)}</Textdate>
          </View>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.memoList}>
        <FlatList data={this.props.memoList} renderItem={this.renderList.bind(this)} keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}


const Textname = styled.Text`
  fontSize: 35px;
  position: absolute;
  width: 100%;
  text-align: center;
  padding-left: 20%;
  top: 40%;
`;

const Textdate = styled.Text`
  fontSize: 15px;
  position: absolute;
  width: 100%;
  text-align: right;
  text-align: center;
  padding-left: 20%;
  bottom: 0%;
`;

const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#FFF',
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default MemoList;
