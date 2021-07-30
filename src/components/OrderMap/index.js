import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const initialRegion = {
  latitude: 35.71559, // 37.785834,
  longitude: -83.50947, // -122.406417,
  latitudeDelta: 0.0222,
  longitudeDelta: 0.0121,
};

const OrderMap = ({car}) => {
  const getImage = type => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }
    return require('../../assets/images/top-UberXL.png');
  };

  return (
    <View style={styles.orderView}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={initialRegion}>
        {car && car?.latitude && (
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
        )}
      </MapView>
    </View>
  );
};

export default OrderMap;

const styles = StyleSheet.create({
  orderView: {
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
