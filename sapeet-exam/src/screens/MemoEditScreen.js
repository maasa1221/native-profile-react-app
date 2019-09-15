import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { Thumbnail } from 'native-base'
import CircleButton from '../elements/CircleButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect,} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../actions';
const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

class MemoEditScreen extends React.Component {
  state = {
    
  }
  radio_props = [
    {label: '男', value: 0 },
    {label: '女', value: 1}
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
        this.setState({ my_photo: result.uri ,my_photo_bool:1})
        file = {
          uri: this.state.my_photo,
          name: `image${this.state.name}.jpg`,
          type: "image/jpeg"
        }
        this.props.postPhoto(file);
      }
    }
  }
  handlePress() {
    this.props.putProfile(this.state,this.state.id)
    file = {
      uri: this.state.my_photo,
      name: `image${this.state.name}.jpg`,
      type: "image/jpeg"
    }
    this.props.postPhoto(file)
    this.setState(this.state)
    this.props.navigation.navigate('Home')
    //console.log(this.state)
  }
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState( params.memo );
    }
  componentDidMount(){
    this.setState({my_photo: `https://sapeetapp.s3-ap-northeast-1.amazonaws.com/uploads/image${this.state.name}.jpg`})
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
          onChangeText={(text) => { this.setState({ name: text }); }}
        />
        <Text style={styles.title}>
        性別
        </Text>
        <RadioForm
          radio_props={this.radio_props}
          initial={this.state.sex == true ? 1 : 0}
          onPress={(value) => {this.setState({sex:value})}}
        />
        <Text style={styles.title}>
        身長
        </Text>
        <TextInput
          style={styles.input}
          keyboardType = 'numeric'
          value={this.state.height.toString()}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.title}>
        年齢
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.age.toString()}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => { this.setState({ age: text }); }}
        />
        <Text style={styles.title}>
        プロフィール画像
        </Text>
        
        <Thumbnail large source={{uri: this.state.my_photo_bool==true? this.state.my_photo : tempAvatar}} style={styles.avatar}/>
        <TouchableOpacity　onPress={this.pickImage}>
          <Text style={styles.signupText}>プロフィール画像変更</Text>
        </TouchableOpacity>
            
        
        
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
