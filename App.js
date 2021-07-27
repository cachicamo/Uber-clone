/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

// Amplify
import {withAuthenticator} from 'aws-amplify-react-native';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

import {getCarId} from './src/graphql/queries';
import {createCar} from './src/graphql/mutations';

import HomeScreen from './src/screens/HomeScreen';

const App: () => Node = () => {
  useEffect(() => {
    const updateUserCar = async () => {
      // Get Authenticated User
      const authenticatedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (!authenticatedUser) {
        return;
      }

      // Check if User already have a car
      const carData = await API.graphql(
        graphqlOperation(getCarId, {id: authenticatedUser.attributes.sub}),
      );

      // If not, create a new Car for the user
      if (carData.data.getCar) {
        console.log('User already has a car assigned');
        return;
      }
      const newCar = {
        id: authenticatedUser.attributes.sub,
        type: 'UberX', // implement driver to select what type later
        userId: authenticatedUser.attributes.sub,
      };
      await API.graphql(graphqlOperation(createCar, {input: newCar}));
    };

    updateUserCar();
  }, []);
  // signout current Driver
  // Auth.signOut()
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default withAuthenticator(App);
