import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Button, Item, Input, Badge,Thumbnail } from 'native-base'
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect,} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../actions';


const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

class MemoEditScreen extends React.Component {
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
/*
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
  }*/
  handlePress() {
    this.props.putProfile(this.state)
    this.props.navigation.goBack()
    /*const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${currentUser.uid}/profile`).doc(this.state.key)
      .update({
        name: this.state.name,
        sex: this.state.sex,
        height: this.state.height,
        age: this.state.age,
        my_photo: this.state.my_photo,
        createdOn: new Date(),
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          name: this.state.name,
          sex: this.state.sex,
          height: this.state.height,
          age: this.state.age,
          my_photo: this.state.my_photo,
          createdOn: newDate,
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });*/

  }
  
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState( params.memo );
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
        <Thumbnail large source={{uri: this.state.my_photo? this.state.my_photo : tempAvatar}} style={styles.avatar}/>
            
        
        
        <CircleButton name="check" onPress={this.handlePress.bind(this)}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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

export default connect(mapStateToProps, mapDispatchToProps)(MemoEditScreen)
