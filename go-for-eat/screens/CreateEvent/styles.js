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
  },
  goButtonText: {
    color: '#FFF',
  },
  PlaceListItem: {
    flex: 1,
    backgroundColor: 'blue',
    height: 50,
    width: 300,
  },
  PlaceListItemName: {
    flex: 1,
    backgroundColor: 'orange',
    width: 100,
  },
  PlaceListItemAddress: {
    backgroundColor: 'yellow',
    width: '100%',
  },
  PlaceListItemDistance: {
    backgroundColor: 'pink',
    width: '100%',
  },
});
