// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import CadastroScreen from '../screens/cadastro';
import HistoricoScreen from '../screens/historico';
import SobreScreen from '../screens/sobre';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#007AFF', // Cor do item ativo
        drawerInactiveTintColor: 'black', // Cor dos itens inativos
        drawerStyle: { backgroundColor: '#FFFFFF' }, // Fundo branco
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen 
        name="Cadastro" 
        component={CadastroScreen} 
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-add-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen 
        name="Histórico" 
        component={HistoricoScreen} 
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen 
        name="Sobre" 
        component={SobreScreen} 
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
