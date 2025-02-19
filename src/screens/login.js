// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, update, get, child } from 'firebase/database';
import { format } from 'date-fns';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    const db = getDatabase();

    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userUid = user.uid;
        const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        // Buscar a lista de usuários no Firebase
        const usersRef = ref(db, '/users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          let userKey = null;

          snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.email === email) {
              userKey = childSnapshot.key; // Obtém a chave correta
            }
          });

          if (userKey) {
            // Atualiza o lastLogin na referência correta
            await update(ref(db, `/users/${userKey}`), {
              ultimoAcessoPeloApp: currentDate,
            });

            console.log('Data e hora atualizadas com sucesso!');
            setIsLoggedIn(true);
            navigation.navigate('Home');
          } else {
            Alert.alert('Erro', 'Usuário não encontrado no banco de dados!');
          }
        } else {
          Alert.alert('Erro', 'Nenhum usuário cadastrado!');
        }
      })
      .catch((error) => {
        console.error('Erro de login:', error.message);
        Alert.alert('Erro', 'Credenciais inválidas!');
      });
  };

  return (
    <LinearGradient colors={['#333333', '#000000']} style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logoPotimaker1.png')} style={styles.logoImage} />
          <Text style={styles.logoText}>| POTIMAKER</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: 'white',
    width: '85%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  button: {
    backgroundColor: '#6a0dad',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
