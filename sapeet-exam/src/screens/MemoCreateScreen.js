import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Thumbnail, Button, Item, Input, Badge } from 'native-base'
import axios from "axios"
//import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import CircleButton from '../elements/CircleButton';
import update from 'react-addons-update'

class MemoCreateScreen extends React.Component {
  state = {
  }

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
        this.setState({ my_photo: result.uri })
        console.log(result.uri)
      }
    }
  }

  updateProfile = async (properties) => {
    try{
      this.setState({ uploading: true })
      let downloadUrl = null
      if (this.state.avatar) {
        downloadUrl = await uploadAvatar(this.state.avatar)
      }
      const batch = db.batch()
      const userRef = userCollection.doc(this.props.user.uid)
      await batch.set(userRef, { name: properties.name, avatar: downloadUrl })
      await batch.commit().then(() => {
        console.log('edit user success.')
      })
      this.setState({
        name: null,
        avatar: null,
      })
      this.props.navigation.goBack()
    }
    catch(e) {
      console.log(e)
      alert('Upload avatar image failed, sorry :(')
    }
    finally {
      this.setState({ uploading: false })
    }
  }

  createProduct = (profile) => {
    axios.post('http://localhost:3001/profiles',profile)
    .then(() => {
      this.props.navigation.goBack()
    })
    .catch(() =>{
    })
  }

  handlePress() {
    
    
    /*const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    db.collection(`users/${currentUser.uid}/profile`).add({
      name: this.state.name,
      sex: this.state.sex,
      height: this.state.height,
      age: this.state.age,
      my_photo: this.state.my_photo,
      createdOn: new Date(),
    })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(() => {
      });*/
      this.createProduct(this.state)
      
    //this.setState('')

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
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          onChangeText={(text) => { this.setState({ name: text }); }}
        />
        <Text style={styles.title}>
        性別
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.sex}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          onChangeText={(text) => { this.setState({ sex: text }); }}
        />
        <Text style={styles.title}>
        身長
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.height}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          onChangeText={(text) => { this.setState({ height: text }); }}
        />
        <Text style={styles.title}>
        年齢
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.age}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          onChangeText={(text) => { this.setState({ age: text }); }}
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

export default MemoCreateScreen;
