import React, {useState} from 'react';
import {View, Dimensions, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';

import {createOrder} from '../../graphql/mutations';

import RouteMap from '../../components/RouteMap';
import UberTypes from '../../components/UberTypes';

const SearchResults = () => {
  const typeState = useState(null);

  const route = useRoute();
  const {originPlace, destinationPlace} = route.params;

  const navigation = useNavigation();

  // confirm Uber ride
  const onSubmit = async () => {
    const [type] = typeState;
    if (!type) {
      return;
    }

    // Submit to server
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const date = new Date();
      const input = {
        createdAt: date.toISOString(),
        type: type,
        originLatitude: originPlace.details.geometry.location.lat,
        originLongitude: originPlace.details.geometry.location.lng,
        destLatitude: destinationPlace.details.geometry.location.lat,
        destLongitude: destinationPlace.details.geometry.location.lng,
        userId: userInfo.attributes.sub,

        carId: '1',
      };
      const response = await API.graphql(
        graphqlOperation(createOrder, {
          input: input,
        }),
      );

      console.log('Good: ', response);
      Alert.alert( "Hurraaay!", "Your Order has been submitted", [{
        text: "Go Home", 
        onPress: () => navigation.navigate('Home'),
      }])
    } catch (error) {
      console.error('SearchResults: ', error);
    }
  };
  
  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      <View style={{height: Dimensions.get('window').height - 410}}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>
      <View style={{height: 410}}>
        <UberTypes typeState={typeState} onSubmit={onSubmit} />
      </View>
    </View>
  );
};

export default SearchResults;
