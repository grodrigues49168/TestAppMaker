import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
      <Text style={styles.eventTime}>{item.time}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#38ef7d', '#32e0c4', '#32a8e0', '#007adf']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Acesso</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
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
