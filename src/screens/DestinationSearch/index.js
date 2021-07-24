import React, {useState, useEffect, useRef} from 'react';
import {View, SafeAreaView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';


import styles from './styles';
import PlaceRow from './PlaceRow';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

const DestinationSearch = props => {
  const navigation = useNavigation();

  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const ref = useRef();
  const ref2 = useRef();

  const checkNavigation = () => {
    // ref.current?.setAddressText('Some Text');
    if (
      originPlace &&
      ref.current?.getAddressText() &&
      destinationPlace &&
      ref2.current?.getAddressText()
    ) {
      navigation.navigate('SearchResults', {
        originPlace,
        destinationPlace,
      });
    }
  };

  useEffect(() => {
    checkNavigation();
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="From"
          onPress={(data, details = null) => {
            setOriginPlace({data, details});
          }}
          // suppressDefaultStyles={true}
          // enablePoweredByContainer={false}
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteConatiner,
            listView: styles.listView,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
          renderDescription={data => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
          ref={ref2}
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({data, details});
          }}
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteConatiner,
              top: 50,
            },
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDh_K53QUG4zUe8ayqnSEkauwAqJ-DVzSk',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
        />
        {/* Circle near Origin */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination */}
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
