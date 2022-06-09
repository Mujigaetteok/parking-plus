import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text>AboutScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

export default AboutScreen;