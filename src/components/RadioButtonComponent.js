import {View, Text} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';

const RadioButtonComponent = ({value, checked, setChecked}) => {
  return (
    <View>
      <RadioButton
        color="#000"
        value={value}
        status={checked === value ? 'checked' : 'unchecked'}
        onPress={setChecked}
      />
    </View>
  );
};

export default RadioButtonComponent;
