import React from 'react';
import {Text, View, Pressable} from 'react-native';
// import { Entypo, Feather } from '@expo/vector-icons';

import UberTypesRow from '../UberTypeRow';

import typesData from '../../assets/data/types';

import styles from './styles';

const UberTypes = () => {

  const confirm = () => {
    console.warn('confirm');
  }

  return (
    <View style={{ }}>
      {typesData.map((type) => (
        <UberTypesRow key={type.id} type={type}/>
      ))}

      <Pressable onPress={confirm} style={styles.confirm}>
        <Text style={styles.text}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;