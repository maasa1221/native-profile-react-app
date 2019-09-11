import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Thumbnail, Button, Item, Input, Badge } from 'native-base'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import CircleButton from '../elements/CircleButton';
import { connect,} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../actions';

class MemoCreateScreen extends React.Component {
  state = {
    my_photo_bool: 1
  }
  radio_props = [
    {label: '男', value: 0 },
    {label: '女', value: 1 }
  ];
  pickImage = async () => {
    let isAccepted = true
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if(permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (newPermission.status !== 'granted') {
        isAccepted = false
      }
    }
    if(isAccepted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 9]
      })
      if (!result.cancelled) {
        this.setState({ my_photo: result.uri})
        this.setState({ my_photo_bool: 0})
        console.log(result.uri)
      }
    }
  }

  handlePress() {
    
      this.props.postProfile(this.state);
      file = {
        uri: this.state.my_photo,
        name: `image${this.state.name}.jpg`,
        type: "image/jpeg"
      }
      this.props.postPhoto(file);
      this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        名前
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          placeholder="名前"
          onChangeText={(text) => { this.setState({ name: text }); }}
        />
        <Text style={styles.title}>
        性別
        </Text>
        <RadioForm
          radio_props={this.radio_props}
          initial={2}
          onPress={(value) => {this.setState({sex:value})}}
        />
        <Text style={styles.title}>
        身長
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.height}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="例:170"
          onChangeText={(integer) => { this.setState({ height: integer }); }}
        />
        <Text style={styles.title}>
        年齢
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.age}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="例:22"
          onChangeText={(integer) => { this.setState({ age: integer }); }}
        />
        <Text style={styles.title}>
        プロフィール画像
        </Text>
        <TouchableOpacity　onPress={this.pickImage}>
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>
        {this.state.my_photo && <Thumbnail source={{uri: this.state.my_photo}} />}
            
        <CircleButton name="check" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(MemoCreateScreen)
