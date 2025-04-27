import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = ({spacing = 16, color = '#E0E0E0'}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          marginVertical: spacing / 2,
          backgroundColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});

export default Divider;
