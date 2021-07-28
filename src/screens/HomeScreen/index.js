import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, Pressable, Dimensions} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Auth, API, graphqlOperation} from 'aws-amplify';
import {getCar} from '../../graphql/queries';
import {updateCar} from '../../graphql/mutations';
import {listOrders} from '../../graphql/queries';

import NewOrderPopup from '../../components/NewOrderPopup';

import styles from './styles';

// const origin = {latitude: 37.7818456, longitude: -122.4296002};
// const destination = {latitude: 37.791707, longitude: -122.443769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk';

const HomeScreen = () => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrders, setNewOrders] = useState([]);
  
  // {
  //   id: '1',
  //   type: 'UberX',
  //   originLatitude: 37.7915456,
  //   originLongitude: -122.4096002,
  //   destLatitude: 37.791804,
  //   destLongitude: -122.4048769,

  //   pickedUp: false,

  //   user: {
  //     name: 'Danny',
  //     rating: '4.82',
  //   },
  // },

  const fetchCar = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const carData = await API.graphql(
        graphqlOperation(getCar, {id: userData.attributes.sub}),
      );

      setCar(carData.data.getCar);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const ordersData = await API.graphql(graphqlOperation(
        listOrders,
        // { filter: {status: {eq: 'NEW'}}}
      ));
      setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCar();
    fetchOrders();
  }, []);

  const onDecline = () => {
    setNewOrders(newOrders.slice(1));
  };

  const onAccept = neworder => {
    setOrder(neworder);
    setNewOrders(newOrders.slice(1));
  };

  const onGoPress = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        isActive: !car?.isActive,
      };
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, {input}),
      );
      setCar(updatedCarData.data.updateCar);
      // setIsOnline(!isOnline);
    } catch (e) {
      console.error(e);
    }
  };

  const onUserLocationChange = async (event) => {
    const {latitude, longitude, heading} = event.nativeEvent.coordinate;
    // update the car position in the order
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        latitude,
        longitude,
        heading,
      };
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, {input}),
      );
      setCar(updatedCarData.data.updateCar);
      // setIsOnline(!isOnline);
      console.log(updatedCarData);
    } catch (e) {
      console.error(e);
    }
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
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.bottomText, {color: 'black'}]}>
            <Icon name={'user'} size={20} color={'black'} /> {order.user.username}
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
            Dropping off {order.user.username}
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
            Picking up {order.user.username}
          </Text>
        </View>
      );
    }
    if (car?.isActive && !order) {
      return (
        <Text style={[styles.bottomText, {color: '#00AF0F'}]}>ONLINE</Text>
      );
    }
    if (!car?.isActive) {
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
            latitude: 35.71559, // 37.785834,
            longitude: -83.50947, // -122.406417,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}>
          {order && (
            <>
              <MapViewDirections
                origin={{
                  latitude: car?.latitude,
                  longitude: car?.longitude,
                }}
                onReady={onDirectionFound}
                destination={getDestination()}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="black"
              />
              <Marker
                coordinate={{
                  latitude: car?.latitude,
                  longitude: car?.longitude,
                }}
                title={'Origin'}
                description={'some address'}
              />
              <Marker
                coordinate={getDestination()}
                title={'Destination'}
                description={'some address'}
              />
            </>
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
            <Text style={styles.goButtonText}>
              {car?.isActive ? 'END' : 'GO'}
            </Text>
          </Pressable>
        )}

        <View style={styles.bottomContainer}>
          <Icon name="sliders" size={30} color="#4a4a4a" />
          {renderBottomTitle()}
          <Feather name="list" size={30} color="#4a4a4a" />

          {newOrders.length > 0 && !order && car?.isActive && (
            <NewOrderPopup
              newOrder={newOrders[0]}
              onDecline={onDecline}
              onAccept={() => onAccept(newOrders[0])}
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
