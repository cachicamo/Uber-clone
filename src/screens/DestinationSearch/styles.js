import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '80%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    marginLeft: 20,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    borderRadius: 50,
    padding: 4,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 10,
  },
  listView: {
    position: 'absolute',
    top: 105,
  },
  autocompleteConatiner: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: 'black',
    position: 'absolute',
    top: 24,
    left: 15,
  },
  line: {
    width: 1,
    height: 37,
    backgroundColor: 'grey',
    position: 'absolute',
    top: 35,
    left: 18.5,

  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: 'black',
    position: 'absolute',
    top: 74,
    left: 15,
  },
});

export default styles;
