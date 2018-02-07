import { StyleSheet, Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export default StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    width: WINDOW.width - 40,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    fontFamily: 'Roboto',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  GooglePlacesAutocompleteContainer: {
    position: 'relative',
    height: 80,
    width: WINDOW.width,
    zIndex: 200,
  },
  datePicker: {
    marginLeft: 20,
    marginBottom: 25,
  },
  timePicker: {
    marginLeft: 20,
    marginBottom: 25,
    width: 80,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  warningText:{
    marginBottom: 20,
    textAlign: 'center',
  },
  goButton: {
    backgroundColor: '#2ECC71',
    paddingLeft: 25,
    paddingRight: 25,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  goButtonText: {
    color: '#FFF',
  },
  disabledStyle: {
    backgroundColor: '#2ECC71',
    opacity: .5,
  },
  disabledTextStyle: {

  },
});
