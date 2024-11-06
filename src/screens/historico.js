import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const userData = {
  name: 'Gabriel Rodrigues Freitas',
  email: 'gr49168@gmail.com',
  id: '8',
  lastAccess: '2024-11-06 10:00', // Data de exemplo
};

const data = [
  { id: '1', status: 'Trancada', time: '2024-10-31 10:00' },
  { id: '2', status: 'Destrancada', time: '2024-10-31 10:10' },
  { id: '3', status: 'Trancada', time: '2024-10-31 10:15' },
  { id: '4', status: 'Destrancada', time: '2024-10-31 10:20' },
  // Adicione mais eventos conforme necessário
];

const HistoryScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>{item.status}</Text>
      <Text style={styles.eventTime}>{formatDateTime(item.time)}</Text>
    </View>
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <LinearGradient
      colors={['#38ef7d', '#32e0c4', '#32a8e0', '#007adf']}
      style={styles.container}
    >
      <View style={styles.mainView}>
        <Text style={styles.title}>Histórico de Acesso</Text>
        <View style={styles.historyContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informações do Usuário</Text>
            <Text style={styles.cardText}>Nome: {userData.name}</Text>
            <Text style={styles.cardText}>Email: {userData.email}</Text>
            <Text style={styles.cardText}>ID: {userData.id}</Text>
            <Text style={styles.cardText}>Último Acesso: {formatDateTime(userData.lastAccess)}</Text>
          </View>
        </View>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  historyContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  eventText: {
    fontSize: 18,
    color: '#333',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default HistoryScreen;
