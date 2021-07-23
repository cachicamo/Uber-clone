import React from 'react';
import {StyleSheet, View} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_KEY = 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk';

const RouteMap = ({origin, destination}) => {
  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  return (
    <View style={styles.homeView}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: originLoc.latitude,
          longitude: originLoc.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0921,
        }}>
        <MapViewDirections
          origin={originLoc}
          destination={destinationLoc}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={4}
          strokeColor="hotpink"
        />
        <Marker
          coordinate={originLoc}
          title={'Origin'}
          description={'some address'}
        />
        <Marker
          coordinate={destinationLoc}
          title={'Destination'}
          description={'some address'}
        />
      </MapView>
    </View>
  );
};

export default RouteMap;

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
