import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Paho from 'paho-mqtt';

const client = new Paho.Client('10.44.1.35', 9001, '/');

const CadastrarBiometriaScreen = ({ navigation }) => {
  const [id, setId] = useState(''); // Estado para armazenar o ID
  const [isConnected, setIsConnected] = useState(false); // Estado para verificar a conexão

  useEffect(() => {
    // Função para conectar ao broker MQTT
    const connectToMqtt = () => {
      client.connect({
        onSuccess: () => {
          console.log('Conectado ao broker MQTT');
          setIsConnected(true); // Atualiza o estado para conectado
        },
        onFailure: (err) => {
          console.error('Falha ao conectar ao broker MQTT:', err);
          Alert.alert('Erro', 'Falha ao conectar ao broker MQTT');
        },
      });
    };

    connectToMqtt();

    // Desconectar ao sair da tela
    return () => {
      if (isConnected) {
        client.disconnect();
        console.log('Desconectado do broker MQTT');
      }
    };
  }, []);

  const handleCadastrarBiometria = () => {
    if (!id) {
      Alert.alert('Erro', 'O campo ID é obrigatório!');
      return;
    }

    if (!isConnected) {
      Alert.alert('Erro', 'Não conectado ao broker MQTT');
      return;
    }

    // Envia o ID para o tópico 'acesso/id'
    const messageId = new Paho.Message(id);
    messageId.destinationName = 'acesso/id';
    client.send(messageId);

    // Envia 'on' para o tópico 'acesso/cadastro'
    const messageOn = new Paho.Message('ok');
    messageOn.destinationName = 'acesso/cadastro';
    client.send(messageOn);

    // Após 2 segundos, envia 'off' para o tópico 'acesso/cadastro'
    setTimeout(() => {
      const messageOff = new Paho.Message('no');
      messageOff.destinationName = 'acesso/cadastro';
      client.send(messageOff);

      Alert.alert('Sucesso', 'Modo de cadastro de biometria ativado!');
  
    });
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