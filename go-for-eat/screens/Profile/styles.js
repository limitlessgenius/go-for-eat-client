import { StyleSheet } from 'react-native';

const picDim = 220;

export default StyleSheet.create({
  profile: {
    flex:1,
    flexDirection:'column',
  },
  profile_picture: {
    alignItems:'center'
  },
  profile_picture_image: {
    margin:20,
    height:picDim,
    width:picDim,
    borderRadius:picDim/2,
    borderWidth:10,
    borderColor: '#2ECC71'
  },
  profile_name: {
    marginLeft:20,
    fontSize:30,
    marginVertical:20
  },
  profile_icon: {

    flex:1
  },

  profile_bio_title: {
    marginLeft:20,
    fontSize:25,
    marginVertical:10,
  },


  profile_rating_stars:{
    marginLeft:20,
    flexDirection:'row',
  },


  profile_interests_outercontainer:{
    flexDirection:'column',

  },
  profile_interests_container:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:10,
  },
  profile_interest: {
    flex:8,
    fontSize:15
  },


});
