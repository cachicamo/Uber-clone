import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';

import {getOrder, getCar} from '../../graphql/queries';
import {onOrderUpdated, onCarUpdated} from './subscriptions';
import OrderMap from '../../components/OrderMap';

const OrderScreen = (props) => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();
  console.log(order);

  // console.warn(route.params?.id);

  // fetch order on initial render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, {id: route.params.id}),
        );
        setOrder(orderData.data.getOrder);
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrder();
  }, []);

  // subscribe to order updates
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onOrderUpdated, {id: route.params.id}),
    ).subscribe({
      next: ({provider, value}) => {
        setOrder(value.data.onOrderUpdated);
        setCar(value.data.onOrderUpdated.carId);
      }, // console.log({provider, value}
      error: error => console.log(error),
    });

    return () => subscription.unsubscribe();
  }, []);

  // fetch car data when order is updated
  useEffect(() => {
    if (!order?.carId || order?.carId === '1') {
      return;
    }
    const fetchCar = async () => {
      try {
        const carData = await API.graphql(
          graphqlOperation(getCar, {id: order.carId}),
        );
        setCar(carData.data.getCar);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCar();
  }, [order]);

  // subscribe to car updates
  useEffect(() => {
    if (!order?.carId || order?.carId === '1') {
      return;
    }
    const subscription = API.graphql(
      graphqlOperation(onCarUpdated, {id: order.carId}),
    ).subscribe({
      next: ({provider, value}) => setCar(value.data.onCarUpdated), // console.log({provider, value}
      error: error => console.log(error),
    });

    return () => subscription.unsubscribe();
  }, [order]);

  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <OrderMap car={car} />
      </View>
      <View>
        <Text>Order Status: {order?.status}</Text>
        <Text>Order Id: {order?.id}</Text>
        <Text>Car Id: {car?.id}</Text>
      </View>
    </View>
  );
};

export default OrderScreen;
