import { StyleSheet } from 'react-native';

const picDim = 220;
const appColor = '#2ECC71';

export default StyleSheet.create({
  bio: {
    flex:1,
    flexDirection:'column',

  },
  bio_picture: {
    alignItems:'center'
  },
  bio_picture_image: {
    margin:20,
    height:picDim,
    width:picDim,
    borderRadius:picDim/2,
    borderWidth:8,
    borderColor: appColor
  },
  bio_headline:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  bio_name: {
    marginLeft:20,
    fontSize:30,
  },
  bio_button:{
    backgroundColor:appColor,
  },
  bio_error: {
    color:'red',
    marginLeft:20
  },
  bio_icon: {
    width:25,
    height:25,
  },
  bio_icon_edit: {
    transform:[{scale:0.9}],

  },
  bio_icon_save: {
    transform:[{scale:0.7}],

  },

  bio_bio_title: {
    marginLeft:20,
    fontSize:16,
    marginTop:10,
    fontFamily:'Roboto_Medium'
  },
  bio_rating_stars:{
    position: 'relative',
    height: 25,
    marginTop: 10,
    marginLeft:20,
    marginBottom:15,
  },
  bio_stars_container: {
    position: 'absolute',
    flexDirection:'row',
    width: 164,
    overflow: 'hidden',
  },
  bio_star: {
    height: 25,
    width: 28,
    marginRight: 6,
  },

  bio_section_outercontainer:{
    flexDirection:'column',

  },
  bio_section_container:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:10,

  },
  bio_section_text: {
    flex:8,
    fontSize:15,
    color:'black',
    marginRight:10

  },
  bio_section_text_italic: {
    flex:8,
    fontSize:15,
    color:'black',
    fontStyle:'italic',
    marginRight:10
  },
  bio_section_text_edit: {
    flex:8,
    fontSize:15,
    color:'black',
    borderBottomWidth:2,
    borderColor:appColor,
    marginRight:10
  },


});
