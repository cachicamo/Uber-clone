import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
 
const origin = {latitude: 37.7818456, longitude: -122.4296002};
const destination = {latitude: 37.791707, longitude: -122.443769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk';


const HomeMap = () => {
  return (
    <View style={styles.homeView}>
      {/* <Text>HomeMap</Text> */}
      <MapView
        style={styles.map}
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