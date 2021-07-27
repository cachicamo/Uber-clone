import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, Pressable, Dimensions} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NewOrderPopup from '../../components/NewOrderPopup';

import styles from './styles';

// const origin = {latitude: 37.7818456, longitude: -122.4296002};
// const destination = {latitude: 37.791707, longitude: -122.443769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk';

const HomeScreen = () => {
  const [myPosition, setMyPosition] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [order, setOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: '1',
    type: 'UberX',
    originLatitude: 37.7915456,
    originLongitude: -122.4096002,
    destLatitude: 37.791804,
    destLongitude: -122.4048769,

    pickedUp: false,

    user: {
      name: 'Danny',
      rating: '4.82',
    },
  });

  const onDecline = () => {
    setNewOrder(null);
  };

  const onAccept = neworder => {
    setOrder(neworder);
    setNewOrder(null);
  };

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onUserLocationChange = event => {
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = event => {
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.3,
        isFinished: order.pickedUp && event.distance < 0.3,
      });
    }
  };

  const getDestination = () => {
    if (order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  const getDistance = () => {
    if (order && order.distance && order.distance < 0.2) {
      setOrder({
        ...order,
        pickedUp: true,
      });
    }
  };

  const renderBottomTitle = () => {
    // console.log(order);
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.bottomText, {color: 'black'}]}>
            <Icon name={'user'} size={20} color={'black'} /> {order.user.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: 200,
              alignItems: 'center',
              backgroundColor: 'red',
              padding: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              COMMPLETE {order.type}
            </Text>
          </View>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={[styles.pickupRow, {backgroundColor: 'red'}]}>
              <Icon name={'user'} size={20} color={'black'} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} mi</Text>
          </View>
          <Text style={[styles.bottomText, {color: 'black'}]}>
            Dropping off {order.user.name}
          </Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={styles.pickupRow}>
              <Icon name={'user'} size={20} color={'black'} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} mi</Text>
          </View>
          <Text style={[styles.bottomText, {color: 'black'}]}>
            Picking up {order.user.name}
          </Text>
        </View>
      );
    }
    if (isOnline && !order) {
      return (
        <Text style={[styles.bottomText, {color: '#00AF0F'}]}>ONLINE</Text>
      );
    }
    if (!isOnline) {
      return (
        <Text style={[styles.bottomText, {color: 'red'}]}>You're Offline</Text>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.homeView}>
        <MapView
          style={{width: '100%', height: Dimensions.get('window').height - 100}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onUserLocationChange={onUserLocationChange}
          initialRegion={{
            latitude: 37.785834,
            longitude: -122.406417,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}>
          {order && (
            <MapViewDirections
              origin={myPosition}
              onReady={onDirectionFound}
              destination={getDestination()}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="black"
            />
          )}
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
          <MaterialCommunityIcons
            name="message-cog"
            size={24}
            color="#4a4a4a"
          />
        </Pressable>

        {!order && (
          <Pressable onPress={onGoPress} style={styles.goButtom}>
            <Text style={styles.goButtonText}>{isOnline ? 'STOP' : 'GO'}</Text>
          </Pressable>
        )}

        <View style={styles.bottomContainer}>
          <Icon name="sliders" size={30} color="#4a4a4a" />
          {renderBottomTitle()}
          <Feather name="list" size={30} color="#4a4a4a" />

          {newOrder && isOnline && (
            <NewOrderPopup
              newOrder={newOrder}
              onDecline={onDecline}
              onAccept={() => onAccept(newOrder)}
              duration="2"
              distance="0.5"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
