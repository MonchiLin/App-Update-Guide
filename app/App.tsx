import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Lottie from "lottie-react-native";
import React, { useRef } from "react";

export default function App() {
  const ref = useRef<Lottie>();

  return (
    <View style={styles.container}>
      <Lottie
        ref={ref}
        loop
        autoPlay
        source={require('./assets/109272-lolo-new-branding.json')}
      />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
