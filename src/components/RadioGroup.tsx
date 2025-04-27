import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {RadioButtonProps, RadioGroupProps} from '../types/typesRadioButton';

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  selected,
  onPress,
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    onPress(value);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.radioContainer, selected && styles.selectedBackground]}>
      <View style={[styles.outerCircle, selected && styles.selectedOuter]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const RadioGroup: React.FC<RadioGroupProps> = ({onPress}) => {
  const [selectedValue, setSelectedValue] = useState<string>('Admin');

  const options: string[] = ['Admin', 'Manager'];

  return (
    <View>
      <Text style={styles.title}>User Types</Text>

      {options.map(option => (
        <RadioButton
          key={option}
          label={option}
          value={option}
          selected={selectedValue === option}
          onPress={value => {
            setSelectedValue(value);
            onPress(value);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedOuter: {
    borderColor: '#007AFF',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  label: {
    fontSize: 16,
  },
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
  selectedBackground: {
    backgroundColor: '#E0F0FF',
  },
});

export default RadioGroup;
