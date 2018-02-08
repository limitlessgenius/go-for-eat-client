import { Dimensions, StyleSheet} from 'react-native';

const appColor = '#2ECC71';
const picDim = 150;

export default StyleSheet.create({
  rating_container:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',
  },
  rating_logo:{
    marginBottom:50,
  },
  rating_picture: {
    marginTop:50,
    height:picDim,
    width:picDim,
    borderRadius:picDim/2,
    borderWidth:5,
    borderColor: appColor,
  },
  rating_question:{
    marginTop:40,
    alignItems:'center',
  },
  rating_question_text:{
    fontSize:18,
    fontFamily: 'Roboto',
  },
  rating_question_name:{
    fontSize:30,
    marginTop:20,
    fontFamily: 'Roboto_Medium',
  },
  rating_current_container:{
    alignItems:'center',
    marginTop:25,
    flexDirection:'row',
  },
  rating_current_text:{
    fontSize:20,
    fontWeight:'bold',
  },
  rating_current_number:{
    fontSize:20,
    color:appColor,
    fontWeight:'bold',
    marginLeft: 6,
  },
  rating_star_container:{
    flexDirection:'row',
    margin:20,
    marginBottom:50,
  },
  rating_star:{
    height:35,
    width:35,
    margin: 5,
  },
  rating_button:{
    borderRadius: 2,
    backgroundColor:appColor,
    paddingHorizontal: 30,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
