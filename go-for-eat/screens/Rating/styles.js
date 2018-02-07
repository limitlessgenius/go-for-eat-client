import { Dimensions, StyleSheet} from 'react-native';

const appColor = '#2ECC71';
const picDim = 130;

export default StyleSheet.create({
  rating_container:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',
  },
  rating_logo:{
    marginBottom:50
  },
  rating_picture: {
    marginTop:40,
    height:picDim,
    width:picDim,
    borderRadius:picDim/2,
    borderWidth:8,
    borderColor: appColor
  },
  rating_text_question:{
    fontSize:25,
    fontWeight:'bold'
  },
  rating_container_current:{
    marginTop:20,
    flexDirection:'row'
  },
  rating_text_current:{
    fontSize:20,
    fontWeight:'bold'
  },
  rating_number_current:{
    fontSize:20,
    color:appColor,
    fontWeight:'bold'
  },
  rating_container_star:{
    flexDirection:'row',
    margin:20,
    marginBottom:50
  },
  rating_star:{
    height:30,
    width:30
  },
  rating_button:{
    backgroundColor:appColor
  }
});
