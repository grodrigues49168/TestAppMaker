import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, database } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const CadastroScreen = ({ navigation }) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [id, setId] = useState('');

  const handleCadastro = () => {
    if (!nomeCompleto || !email || !senha || !senhaAdmin || !id) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (senhaAdmin !== 'potimaker1') {
      Alert.alert('Erro', 'A senha do administrador!');
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, `/${id}`), {
          nome: nomeCompleto,
          email: email, // Enviando o email para o banco de dados
          id: id,
        });
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <LinearGradient colors={['#39f362', '#81d4a1', '#4db6ac', '#3e82bd']} style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.title}>Cadastro de Novos Usuários</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#999"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
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
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Id"
          placeholderTextColor="#999"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha do Administrador"
          placeholderTextColor="#999"
          secureTextEntry
          value={senhaAdmin}
          onChangeText={setSenhaAdmin}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
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
    backgroundColor: '#1e90ff',
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

export default CadastroScreen;
