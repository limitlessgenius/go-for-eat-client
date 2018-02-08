import { StyleSheet } from 'react-native';

const picDim = 220;
const appColor = '#2ECC71';

export default StyleSheet.create({
  bio: {
    flex:1,
    flexDirection:'column',
    backgroundColor: 'white'
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
    alignItems:'center',
    justifyContent:'space-between',
  },
  bio_name: {
    marginLeft:20,
    fontSize:30,
  },
  bio_button:{
    borderRadius: 2,
    backgroundColor:appColor,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    marginLeft:20,
    flexDirection:'row',
    marginBottom:10
  },
  bio_stars: {
    transform:[{scale:0.8}],
    marginTop:5
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
