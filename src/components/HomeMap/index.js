import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {API, graphqlOperation} from 'aws-amplify';
import {listCars} from '../../graphql/queries';

const HomeMap = props => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [cars, setCars] = useState([]);
  
  const getImage = type => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  };

  function success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);

    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);

      var initialRegion = {
        latitude: 35.71559, // 37.785834,
        longitude: -83.50947, // -122.406417,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      };
      setInitialRegion(initialRegion);

      const fetchCars = async () => {
        try {
          const response = await API.graphql(graphqlOperation(listCars));

          setCars(response.data.listCars.items);
          // console.log(response.data.listCars.items);
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchCars();
    });
  }, []);
  // console.log(cars);
  return (
    <View style={styles.homeView}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        initialRegion={initialRegion}>
        {cars.map(car => (
          <Marker
            key={car.id}
            coordinate={{latitude: car.latitude, longitude: car.longitude}}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                transform: [
                  {
                    rotate: `${car.heading}deg`,
                  },
                ],
              }}
              source={getImage(car.type)}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  homeView: {
    height: '100%',
    backgroundColor: '#a0abaf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
