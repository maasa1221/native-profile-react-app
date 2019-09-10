import React from 'react';
import { Container, Content, Header, Left, Button, Item, Input, Badge,Thumbnail } from 'native-base'

import { StyleSheet, View, Text, TouchableHighlight, FlatList} from 'react-native';
const tempAvatar = 'https://sapeetapp.s3-ap-northeast-1.amazonaws.com/uploads/image.jpg'


class MemoList extends React.Component {
  renderMemo({ item }) {
    return (
      <TouchableHighlight onPress={() => { this.props.navigation.navigate('MemoDetail', { memo: item}); }}>
          <View style={styles.memoListItem}>
          <Thumbnail large source={{uri: item.my_photo? item.my_photo : tempAvatar}} style={styles.avatar}/>
            <Text style={styles.memoTitle}>{item.name.substring(0, 10)}</Text>
            <Text style={styles.memoTitle}>{item.updated_at.substring(0, 10)}</Text>
          </View>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.memoList}>
        <FlatList data={this.props.memoList} renderItem={this.renderMemo.bind(this)} keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}

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
  memoTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});

export default MemoList;
