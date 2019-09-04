import React from 'react';
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Button, Item, Input, Badge,Thumbnail } from 'native-base'
import CircleButton from '../elements/CircleButton';

const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

const dateString = (date) => {
  const str = date;
  return str.split('T')[0];
};



class MemoDetailScreen extends React.Component {
  state = {
  }
  
  handlePress() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
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

        <Text style={styles.title}>
        名前
        </Text>
        <TextInput
          style={styles.input}
          value={memo.name}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={memo.name}
          onChangeText={(text) => { this.setState({ name: text }); }}
        />
        <Text style={styles.title}>
        性別
        </Text>
        <TextInput
          style={styles.input}
          value={memo.sex}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={memo.sex}
          onChangeText={(text) => { this.setState({ sex: text }); }}
        />
        <Text style={styles.title}>
        身長
        </Text>
        <TextInput
          style={styles.input}
          value={memo.height}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={memo.height}
          onChangeText={(text) => { this.setState({ height: text }); }}
        />
        <Text style={styles.title}>
        年齢
        </Text>
        <TextInput
          style={styles.input}
          value={memo.age}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={memo.age}
          onChangeText={(text) => { this.setState({ age: text }); }}
        />
        <Text style={styles.title}>
        プロフィール画像
        </Text>
        <Thumbnail large source={{uri: memo.my_photo? memo.my_photo : tempAvatar}} style={styles.avatar}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoHeader: {
    height: 100,
    backgroundColor: '#17313C',
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

export default MemoDetailScreen;
