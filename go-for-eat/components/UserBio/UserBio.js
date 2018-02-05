import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import profileStar from '../../assets/icons/profile_star.png';
import profileStarEmpty from '../../assets/icons/profile_star_empty.png';
import profileEdit from '../../assets/icons/profile_edit.png';
import profileSave from '../../assets/icons/profile_save.png';
import s from './styles.js';
import { updateUser } from '../../actions';

class UserBio extends Component {

  state = {
    edit: {
      interests: false,
      profession:false,
      description:false
    },
    text: {
      interests:'',
      profession:'',
      description:''
    }
  };

  componentDidMount() {
    console.log(this.props.user);
    this.setState({
      ...this.state,
      text:{
        interests:this.props.user.interests,
        profession:this.props.user.profession,
        description:this.props.user.description
      }
    });
  }
  handleEdit = (key) => {
    return () => {
      this.setState({edit: {...this.state.edit, [key]:true}});


    };
  }

  handleSave = (key) => {
    return () => {
      this.setState({
        edit: {
          ...this.state.edit,
          [key]:false
        }
      });

      const data = {[key]:this.state.text[key]};
      this.props.updateUser(data);
    };
  }

  getAgeFromBirthday = (birthday) => {
    const dateDiff = Date.now() - new Date(birthday);
    const newDate = new Date(dateDiff);
    return Math.abs(newDate.getUTCFullYear()-1970);
  }


  renderRating = () => {
    const { ratings_average } = this.props.user;
    const stars = [];
    for (var i = 1; i <= 5; i++) {
      if (i<=Math.ceil(ratings_average)) stars.push(<Image style={s.profile_stars}  key={i} source={profileStar}/>);
      else stars.push(<Image key={i} style={s.profile_stars} source={profileStarEmpty}/>);
    }
    return stars;
  }

  renderRatingSection =() => {
    const { ratings_number } = this.props.user;
    return (
      <View>
        <Text style ={s.profile_bio_title}>Rating:</Text>
        <View style={s.profile_rating_stars}>
          {ratings_number>0?
            this.renderRating()
            :
            <Text>No ratings to show.</Text>
          }
        </View>
      </View>
    );
  }

  renderSection = (key, title) => {

    if (this.props.screen==='User' && this.state.text[key]==='') return null;
    return (
      <View style={s.profile_section_outercontainer}>
        <Text style={s.profile_bio_title}>{title}</Text>
        <View style={s.profile_section_container}>
          {(this.state.edit[key])?
            (
              <TextInput
                onChangeText={(text)=> this.setState({text:{...this.state.text, [key]:text}})}
                style={s.profile_section_text_edit}
                value={this.state.text[key]}/>
            )
            :
            (this.state.text[key]==='')?
              <Text style={s.profile_section_text_italic}>Add your {key} here</Text>
              :
              <Text style={s.profile_section_text}>{this.state.text[key]}</Text>

          }
          {(this.props.screen==='Profile')?(this.state.edit[key])?
            (<TouchableOpacity ref={key} style={s.profile_icon} onPress={this.handleSave(key)}>
              <Image style={s.profile_icon_save} source={profileSave}/>
            </TouchableOpacity>)
            :
            (<TouchableOpacity ref={key} style={s.profile_icon} onPress={this.handleEdit(key)}>
              <Image style={s.profile_icon_edit} source={profileEdit}/>
            </TouchableOpacity>):null
          }

        </View>
      </View>
    );
  }

  render() {

    if (!this.props.user) return null;
    const { name, birthday, profile_picture, interests, profession, description } = this.props.user;
    return (
      <KeyboardAwareScrollView  style={s.profile} behavior='padding'>
        <View style={s.profile_picture}>
          <Image
            source={{uri:profile_picture}}
            style={s.profile_picture_image}
          />
        </View>
        <Text style={s.profile_name}>{name}{birthday?', ' + this.getAgeFromBirthday(birthday):''}</Text>
        {this.renderRatingSection()}
        {this.renderSection('profession', 'Profession: ')}
        {this.renderSection('description', 'Brief Description: ')}
        {this.renderSection('interests', 'Interests: ')}
        <View style={{ height: 60 }} />
      </KeyboardAwareScrollView>

    );
  }



}

const mapStateToProps = (state) => ({
  // user:state.authentication.user,
  screen:state.pages.currentScreen
});

const mapDispatchToProps = (dispatch) => ({
  updateUser:data => dispatch(updateUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBio);
