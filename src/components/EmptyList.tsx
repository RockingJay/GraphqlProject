import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyList = ({message = 'No results found.'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#888',
  },
});
