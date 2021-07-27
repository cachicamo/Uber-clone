import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  homeView: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },

  bottomContainer: {
    width: '100%',
    height: 80,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  roundButtom: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  goButtom: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#1495ff',
    padding: 20,
    bottom: 80,
  },
  goButtonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  balanceButton: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 50,
    width: 130,
    height: 50,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  pickupRow: {
    backgroundColor: '#7ee733',
    width: 30,
    height: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default styles;