import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  GooglePlacesAutocompleteContainer: {
    position: 'relative',
    height: 80,
    width:'100%',
    zIndex: 200,
  },
  datePicker: {
    marginBottom: 25,
  },
  timePicker: {
    marginBottom: 25,
    width: 80,
  },
  bottomContainer: {
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  goButtonText: {
    color: '#FFF',
  },
});
