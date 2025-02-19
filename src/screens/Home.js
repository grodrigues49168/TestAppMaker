import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set } from 'firebase/database';

export default function HomeScreen() {
  const [isLocked, setIsLocked] = useState(true);
  const navigation = useNavigation();
  const db = getDatabase();

  const toggleLock = () => {
    if (isLocked) {
      // Destravar a porta e enviar "on" para o Firebase
      setIsLocked(false);
      set(ref(db, 'porta'), 'on');

      // Após 10 segundos, trancar a porta e enviar "off"
      setTimeout(() => {
        setIsLocked(true);
        set(ref(db, 'porta'), 'off');
      }, 10000);
    }
  };

  return (
    <LinearGradient
      colors={['#38ef7d', '#32e0c4', '#32a8e0', '#007adf']}
      style={styles.container}
    >
      <View style={styles.mainView}>
        <Text style={styles.title}>Controle de Acesso do Laboratório</Text>

        <TouchableOpacity
          style={[styles.lockButton, { backgroundColor: isLocked ? '#ff4d4d' : '#4caf50' }]}
          onPress={toggleLock}
        >
          <FontAwesome5 name={isLocked ? "lock" : "lock-open"} size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.lockStatus}>Situação da Trava: {isLocked ? 'Trancada' : 'Destrancada'}</Text>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('Histórico')}
        >
          <FontAwesome5 name="history" size={20} color="#000" />
          <Text style={styles.historyText}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mainView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  lockButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  lockStatus: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 15,
    marginTop: 20,
  },
  historyText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
});
