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
    fontSize: 22,
    fontFamily: 'Roboto',
    justifyContent: 'flex-start',
    marginBottom: 6,
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
    borderRadius: 2,
    paddingHorizontal: 30,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  warn_container:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    marginHorizontal:'10%',
    marginVertical: 20,
  },
  warn: {
    textAlign: 'center',
    color: '#bbb',
    fontSize: 14,
  },
});
