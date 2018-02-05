import { PixelRatio } from 'react-native';

export default {
  datePicker: {
    dateInput:{
      borderWidth: 0,
      borderBottomWidth: 3 / PixelRatio.get(),
      borderBottomColor: '#2ECC71',
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
    }
  },
  timePicker: {
    dateInput:{
      borderWidth: 0,
      borderBottomWidth: 3 / PixelRatio.get(),
      borderBottomColor: '#2ECC71',
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
    }
  }
};