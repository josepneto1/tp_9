import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '../firebase';
import Routes from '../routes';

export default function SignUp() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [msg, setMsg] = useState('');

  function cadastrarUsuario() {
    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(userCredential => {
        navigation.navigate(Routes.BooksListPage)
      })
      .catch(error => {
        setMsg(error.message);

      })
  }

  return (
    <View style={styles.signUp}>
      <View style={styles.container}>
        
        <Text>Email:</Text>
        <TextInput 
          value={userEmail}
          style={styles.input}
          onChangeText={setUserEmail}/>
        
        <Text>Senha:</Text>
        <TextInput 
          value={userPassword}
          style={styles.input}
          secureTextEntry
          onChangeText={setUserPassword}/>

        <TouchableOpacity
          style={styles.btn}
          onPress={cadastrarUsuario}>
          <Text style={styles.btnLabel}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnEntrar]}
          onPress={() => navigation.navigate(Routes.SignIn)}>
          <Text style={[styles.btnLabel, styles.btnLabelEntrar]}>Já Possuo Cadastro</Text>
        </TouchableOpacity>
        
        <Pressable
          onPress={() => navigation.navigate(Routes.BooksListPage)}>
          <Text style={styles.btnEntrarSemLogin}>Entrar sem fazer login</Text>
        </Pressable>

        <View>
          <Text>{msg}</Text>
        </View>
      </View>
    </View>
  ) ;
}

const styles = StyleSheet.create({
  signUp: {
    flex: 1,
    justifyContent: 'center',

  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#e5e5e5',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',

  },
  input: {
    backgroundColor: '#f8f9fa',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  btn: {
    borderRadius: 5,
    width: '75%',
    margin: 10,
    padding: 10,
    ...Platform.select({
      android: {
        backgroundColor: '#52796f',
      },
      ios: {
        backgroundColor: '#4a4e69',
      },
      default: {
        backgroundColor: '#353535',
      }
    })
  },
  btnEntrar:{
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    ...Platform.select({
      android: {
        borderColor: '#52796f',
      },
      ios: {
        borderColor: '#4a4e69',
      },
      default: {
        borderColor: '#353535',
      }
    })
    
  },
  btnLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnLabelEntrar: {
    color: '#353535',
  },
  btnEntrarSemLogin: {
    marginTop: 5,
    fontSize: 13
  },
});