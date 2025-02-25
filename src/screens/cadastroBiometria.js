import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { database } from '../../config/firebaseConfig';
import { ref, set } from 'firebase/database';

const CadastrarBiometriaScreen = ({ navigation }) => {
  const [id, setId] = useState(''); // Estado para armazenar o ID

  const handleCadastrarBiometria = async () => {
    if (!id) {
      Alert.alert('Erro', 'O campo ID é obrigatório!');
      return;
    }

    try {
      // Ativa o modo de cadastro no Firebase
      await set(ref(database, `cadastroBiometria/${id}`), {
        cadastrar: true, // Ativa o modo de cadastro
      });

      Alert.alert('Sucesso', 'Modo de cadastro de biometria ativado!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao ativar o modo de cadastro:', error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <LinearGradient colors={['#39f362', '#81d4a1', '#4db6ac', '#3e82bd']} style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.title}>Cadastrar Biometria</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o ID"
          placeholderTextColor="#999"
          value={id}
          onChangeText={setId}
        />
        <TouchableOpacity style={styles.button} onPress={handleCadastrarBiometria}>
          <Text style={styles.buttonText}>Cadastrar Biometria</Text>
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

export default CadastrarBiometriaScreen;