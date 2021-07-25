import React, {useState, previousState} from 'react';
import {View, SafeAreaView, Text, Pressable, Dimensions} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NewOrderPopup from '../../components/NewOrderPopup';

import styles from './styles';

const origin = {latitude: 37.7818456, longitude: -122.4296002};
const destination = {latitude: 37.791707, longitude: -122.443769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk';

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);

  const onGoPress = () => {
    setIsOnline(!isOnline);
  }
  return (
    <SafeAreaView>

    <View style={styles.homeView}>
      {/* <Text>HomeMap</Text> */}
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 100}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView>

      <Pressable
        onPress={() => console.warn('pressed')}
        style={[styles.roundButtom, {top: 10, left: 10}]}>
        <Feather name="menu" size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: '#00FF00'}}>$</Text> 152.50
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.warn('pressed')}
        style={[styles.roundButtom, {top: 10, right: 10}]}>
        <Feather name="search" size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('pressed')}
        style={[styles.roundButtom, {bottom: 90, left: 10}]}>
        <Feather name="shield" size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('pressed')}
        style={[styles.roundButtom, {bottom: 90, right: 10}]}>
        <MaterialCommunityIcons name="message-cog" size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable onPress={onGoPress} style={styles.goButtom}>
        <Text style={styles.goButtonText}>{isOnline ? 'STOP' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Icon name="sliders" size={30} color="#4a4a4a" />
        {isOnline ? (
          <Text style={[styles.bottomText, {color: '#00AF0F'}]}>ONLINE</Text>
        ) : (
          <Text style={[styles.bottomText, {color: 'red'}]}>
            You're Offline
          </Text>
        )}
        <Feather name="list" size={30} color="#4a4a4a" />
      <NewOrderPopup />
      </View>

    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

