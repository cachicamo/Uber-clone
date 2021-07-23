import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

const CovidMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel only if necessary</Text>
      <Text style={styles.text}>
        You may have noticed we often make fun of California on "Tucker Carlson
        Tonight," but we're not really joking.
      </Text>
      <Text style={styles.learnMore}>Learn More -></Text>
    </View>
  );
};

export default CovidMessage;
