import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const NewOrderPopup = () => {

  const onDecline = () => {
    console.warn('Declined')
  };
  const onAccept = () => {
    console.warn('Accepted Order')
  };
  return (
    <View style={styles.rootContainer}>
      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>
        <Ionicons name={"close"} size={20} />
        {' '}
        Decline
        </Text>
      </Pressable>
      <Pressable onPress={onAccept} style={styles.popupContainer}>
        <View style={styles.row}>
          <Text style={styles.uberType}>UberX</Text>
          <View style={styles.userBg}>
            <FontAwesome name={"user"} size={36} color={"lightgrey"}/>
          </View>
          <Text style={styles.uberType}>
            <AntDesign name={"star"} size={14} />
            {' '}
            5.00
          </Text>
        </View>
        <Text style={styles.minutes}>12 min</Text>
        <Text style={styles.distance}>0.2 mi</Text>
        <Text style={styles.direction}>
          <AntDesign name={"star"} size={14} />
          {' '}
          towards your destination
        </Text>
      </Pressable>
    </View>
  );
};

export default NewOrderPopup;
