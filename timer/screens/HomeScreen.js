import React from 'react';
import {
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import * as firebase from 'firebase'

import t from 'tcomb-form-native'

const Form = t.form.Form
const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
})

const firebaseConfig = {
  apiKey: "AIzaSyBAzewHh5Z4kbndbgRP-HASXXLK980yG94",
  authDomain: "my-project-1515604674581.firebaseapp.com",
  databaseURL: "https://my-project-1515604674581.firebaseio.com",
  projectId: "my-project-1515604674581",
  storageBucket: "my-project-1515604674581.appspot.com",
  messagingSenderId: "758516710493"
}

firebase.initializeApp(firebaseConfig)

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rn: 0,
      auth: false
    }
    this.dbTest = this.dbTest.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount(){
    this.dbTestUpdate()
  }

  dbTest(){
    console.log('asdf')
    firebase.database().ref('test').set({
      randomNumber: Math.ceil(Math.random() * 10)
    }).catch(err => console.log(err))
  };

  dbTestUpdate(){
    firebase.database().ref('test').on('value', snapshot => {
      const rn = snapshot.val().randomNumber
      console.log(rn)
      this.setState({ rn: rn })
    })
  }

  handleSubmit = () => {
    const value = this._form.getValue()
    console.log(value)
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <TouchableOpacity onPress={this.dbTest} style={styles.getStartedText}>
              <Text>db test</Text>
              <Text>random number: {this.state.rn}</Text>
            </TouchableOpacity>
            <Form type={User} ref={c => this._form = c}/>
            <Button title={'submit'} onPress={this.handleSubmit}/>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
