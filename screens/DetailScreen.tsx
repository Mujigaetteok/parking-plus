import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
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

export default DetailScreen;