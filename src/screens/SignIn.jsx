import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from '../firebase';
import Routes from '../routes';

export default function SignIn() {
  const navigation = useNavigation();

  const [userEmail, setUserEmail] = useState('teste@email.com');
  const [userPassword, setUserPassword] = useState('');
  const [msg, setMsg] = useState('');

  function verificarUsuario() {
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(userCredential => {
        navigation.navigate(Routes.BooksListPage)
      })
      .catch(error => {
        setMsg(error.message);
      })
  }

  return (
    <View>
      <View style={styles.login}>
        <View style={styles.container}>
          <Text>Email:</Text>
          <TextInput 
            value={userEmail}
            style={styles.input}
            onChangeText={setUserEmail}
            />
          <Text>Senha:</Text>
          <TextInput 
            value={userPassword}
            style={styles.input}
            secureTextEntry
            onChangeText={setUserPassword}
            />
          <TouchableOpacity
            style={styles.btn}
            onPress={verificarUsuario}>
            <Text style={styles.btnLabel}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
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
  btnLabel: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
