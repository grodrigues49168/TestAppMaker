import React from 'react';
import { View, Text, Animated, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const SobreScreen = () => {
  const githubScale = new Animated.Value(1);
  const potimakerScale = new Animated.Value(1);
  const instagramScale = new Animated.Value(1);

  const handlePressIn = (scaleValue) => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleValue, url) => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
    });
  };

  return (
    <LinearGradient
      colors={['#32a852', '#32db8b', '#32b8db', '#3270db']}
      style={styles.container}
    >
      <View style={styles.mainView}>
        <Text style={styles.title}>Sobre o Aplicativo</Text>
        
        <View style={styles.buttonsContainer}>
          {/* Card do GitHub */}
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.BEGAN) handlePressIn(githubScale);
              if (nativeEvent.state === State.END) handlePressOut(githubScale, 'https://github.com/grodrigues49168');
            }}
          >
            <Animated.View style={[styles.card, { transform: [{ scale: githubScale }] }]}>
              <FontAwesome5 name="github" size={24} color="black" />
              <Text style={styles.buttonText}>GitHub</Text>
            </Animated.View>
          </TapGestureHandler>

          {/* Card do Potimaker */}
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.BEGAN) handlePressIn(potimakerScale);
              if (nativeEvent.state === State.END) handlePressOut(potimakerScale, 'https://potimaker-ifrn.github.io/sitePotimaker/index.html');
            }}
          >
            <Animated.View style={[styles.card, { transform: [{ scale: potimakerScale }] }]}>
              <FontAwesome5 name="globe" size={24} color="black" />
              <Text style={styles.buttonText}>Potimaker</Text>
            </Animated.View>
          </TapGestureHandler>

          {/* Card do Instagram */}
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.BEGAN) handlePressIn(instagramScale);
              if (nativeEvent.state === State.END) handlePressOut(instagramScale, 'https://instagram.com/potimaker.ifrn?igshid=NzZhOTFlYzFmZQ==');
            }}
          >
            <Animated.View style={[styles.card, { transform: [{ scale: instagramScale }] }]}>
              <FontAwesome5 name="instagram" size={24} color="black" />
              <Text style={styles.buttonText}>Instagram</Text>
            </Animated.View>
          </TapGestureHandler>
        </View>

        <Text style={styles.footerText}>versão beta 1.0.1 | POTIMAKER© </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default SobreScreen;
