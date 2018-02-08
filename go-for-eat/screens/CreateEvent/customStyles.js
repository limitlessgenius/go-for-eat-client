import { PixelRatio } from 'react-native';

export default {
  datePicker: {
    dateInput:{
      borderWidth: 0,
      borderBottomWidth: 5 / PixelRatio.get(),
      borderBottomColor: '#2ECC71',
    },
    dateIcon:{
      display: 'none'
    },
    placeholderText:{
      color: '#000',
      fontSize: 18,
    },
    dateText:{
      color: '#000',
      fontSize: 18,
    }
  },
  timePicker: {
    dateInput:{
      borderWidth: 0,
      borderBottomWidth: 5 / PixelRatio.get(),
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
