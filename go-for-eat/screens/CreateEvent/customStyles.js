export default {
  googlePlacesAutocomplete : {
    container: {
      position: 'relative',
    },
    description: {
      backgroundColor: 'red',
    },
    textInputContainer: {
      backgroundColor: 'green',
      borderTopWidth: 0,
    },
    textInput: {
      height: '100%',
      borderRadius: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      borderBottomWidth: 2,
      borderBottomColor: '#2ECC71',
      fontSize: 18,
    },
    loader: {
      backgroundColor: 'blue',
    },
    listView: {
      flex: 1,
      backgroundColor: 'white',
      position: 'absolute',
      top: 44,
      shadowColor: '#444',
      shadowOffset: { width: 0, height: -1 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    poweredContainer: {
      display: 'none',
    },
    separator: {
      borderBottomColor: '#2ECC71',
      borderBottomWidth: 1,
    },
  },
  datePicker: {
    dateInput:{
      borderWidth: 0,
      borderBottomColor: '#2ECC71',
      borderBottomWidth: 2,
    },
    dateIcon:{
      display: 'none'
    },
    placeholderText:{
      color: '#000',
      fontSize: 20,
    },
    dateText:{
      color: '#000',
      fontSize: 20,
      borderBottomColor: '#2ECC71',
      borderBottomWidth: 1,
    }
  },
  timePicker: {
    dateInput:{
      borderWidth: 0,
      borderBottomColor: '#2ECC71',
      borderBottomWidth: 2,
    },
    dateIcon:{
      display: 'none',
    },
    placeholderText:{
      color: '#000',
      fontSize: 20,
    },
    dateText:{
      color: '#000',
      fontSize: 20,
      borderBottomColor: '#2ECC71',
      borderBottomWidth: 1,
    }
  }
};