import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';

const HistoricoScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  // Função para formatar a data e hora para DD/MM/AAAA HH:MM
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Data desconhecida';
    const date = new Date(dateTimeString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <LinearGradient colors={['#38ef7d', '#32e0c4', '#32a8e0', '#007adf']} style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.title}>Histórico de Acessos</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.label}>Email: <Text style={styles.value}>{item.email}</Text></Text>
              <Text style={styles.label}>ID: <Text style={styles.value}>{item.id}</Text></Text>
              <Text style={styles.label}>
                Último Acesso: <Text style={styles.value}>{formatDateTime(item.ultimoAcessoPeloApp)}</Text>
              </Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#555',
  },
});

export default HistoricoScreen;
