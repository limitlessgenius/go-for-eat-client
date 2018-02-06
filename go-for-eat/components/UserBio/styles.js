import { StyleSheet } from 'react-native';

const picDim = 220;
const appColor = '#2ECC71';

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
    borderWidth:8,
    borderColor: appColor
  },
  profile_name: {
    marginLeft:20,
    fontSize:30,
    marginVertical:10
  },
  profile_error: {
    color:'red',
    marginLeft:20
  },
  profile_icon: {
    width:25,
    height:25,
  },
  profile_icon_edit: {
    transform:[{scale:0.9}],

  },
  profile_icon_save: {
    transform:[{scale:0.7}],

  },

  profile_bio_title: {
    marginLeft:20,
    fontSize:16,
    marginTop:10,
    fontFamily:'Roboto_Medium'
  },


  profile_rating_stars:{
    marginLeft:20,
    flexDirection:'row',
    marginBottom:10
  },
  profile_stars: {
    transform:[{scale:0.8}],
    marginTop:5
  },

  profile_section_outercontainer:{
    flexDirection:'column',

  },
  profile_section_container:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:10,

  },
  profile_section_text: {
    flex:8,
    fontSize:15,
    color:'black',
    marginRight:10

  },
  profile_section_text_italic: {
    flex:8,
    fontSize:15,
    color:'black',
    fontStyle:'italic',
    marginRight:10
  },
  profile_section_text_edit: {
    flex:8,
    fontSize:15,
    color:'black',
    borderBottomWidth:2,
    borderColor:appColor,
    marginRight:10
  },


});
