import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: 700,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: '#00000044'
  },
  popupContainer: {
    backgroundColor: 'black',
    borderRadius: 20,
    bottom: 0,
    height: 250,
    width: 350,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  minutes: {
    color: 'lightgrey',
    fontSize: 40,
  },
  distance: {
    color: 'lightgrey',
    fontSize: 26,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uberType: {
    color: 'lightgrey',
    fontSize: 20,
    marginHorizontal: 10,
  },
  userBg: {
    backgroundColor: '#008bff',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  direction: {
    color: 'white',
    fontSize: 16,
  },
  declineButton: {
    backgroundColor: 'black',
    padding: 6,
    borderRadius: 20,
    width: 120,
    alignItems: 'center',
    marginTop: 55,

  },
  declineText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default styles;
