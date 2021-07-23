import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, Image, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Auth} from 'aws-amplify';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView>
      <View style={{backgroundColor: '#212121', padding: 15}}>
        {/* User Row */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#cacaca',
              width: 60,
              height: 60,
              borderRadius: 25,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/bear-nice.jpeg')}
            alt="no-image"
          />
          <View>
            <Text
              style={{color: '#f4f4f4', marginLeft: 15, paddingVertical: 4}}>
              Jesus Porrello
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 12,
                color: '#ddd',
                marginLeft: 15,
                paddingVertical: 5,
              }}>
              5.00 <Entypo name={'star'} size={14} color={'#ddd'} />
            </Text>
          </View>
        </View>

        {/* Message Row */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#919191',
            borderTopWidth: 1,
            borderTopColor: '#919191',
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Pressable onPress={() => console.warn('Messages')}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#ddd', paddingVertical: 5}}>
                Messages{' '}
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    height: 8,
                    width: 8,
                    backgroundColor: '#00aaff',
                    borderRadius: 50,
                  }}
                />
              </Text>
              <Text style={{color: '#f4f4f4'}}>></Text>
            </View>
          </Pressable>
        </View>
        {/* Do more */}
        <Pressable onPress={() => console.warn('Do more with your account...')}>
          <Text style={{color: '#ddd', paddingVertical: 5}}>
            Do more with your account
          </Text>
        </Pressable>
        {/* Make Money */}
        <Pressable onPress={() => console.warn('Make money...')}>
          <Text
            style={{color: 'white', fontWeight: 'bold', paddingVertical: 5}}>
            Make money driving
          </Text>
        </Pressable>
      </View>

      <DrawerItemList {...props} />
      {/* Logout */}
      <Pressable
        onPress={() => {
          Auth.signOut();
        }}>
        <Text style={{padding: 15, marginLeft: 5}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
