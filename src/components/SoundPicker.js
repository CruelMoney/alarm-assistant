import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Picker, TouchableWithoutFeedback  } from 'react-native';
import iTunes from 'react-native-itunes';
import Body from './text/Body';
import Span from './text/Span';
import Link from './text/Link';

const soundFiles = [
  { 
    name:'sound 1',
    file: '' 
  }, 
  { 
    name:'Birds',
    file: 'bird_chirps.mp3' 
  }
];

class SoundPicker extends Component {
  state={
    selected: false,
    choices: [],
    loading: false,
    visible: false,
  }

  componentDidMount(){
    const { soundType, soundFile, soundName} = this.props;

    this.setState({
      type: soundType,
      selected: soundName
    })
  }

  selectValue = (val, label) => {
    const { onChange } = this.props;
    const { type } = this.state;
    !!onChange && onChange(type, val, label);

    this.setState({
      selected: label
    });
  }

  showModal = () => {
    this.setState({visible: true});
  }
  closeModal = () => {
    this.setState({visible: false});
  }

  pickPlaylist = () => {
    this.setState({
      loading: true,
      visible: true,
      type: 'playlist'
    });

    iTunes.getPlaylists().then(playlists => {
      this.setState({
        choices: playlists,
        loading: false
      });
    });  
  }

  pickSound = () => {
    this.setState({
      visible: true,
      type: 'sound'
    });

    this.setState({
      choices: soundFiles,
      loading: false
    }); 
  }

  render() {
    const {textStyle} = this.props;
    const {type} = this.state;

    return (
      <View style={{flexDirection: "column", alignSelf:"stretch",justifyContent:"space-around"}}>
        <View style={{flexDirection: "row", alignSelf:"stretch",justifyContent:"space-around"}}>
        <TouchableOpacity
        onPress={this.pickSound}
        >
          <Link style={textStyle}>Sound</Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pickPlaylist}
        >
        <Link style={textStyle}>Playlist</Link>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={
            type === 'sound' ?
            this.pickSound : this.pickPlaylist}
        >
          <Body style={textStyle}>
              {this.state.selected}
          </Body>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.visible}
          onRequestClose={this.closeModal}>
          <TouchableWithoutFeedback //this touchable closes modal
                                onPress={() => {
                                    this.closeModal();
                                }}>
          <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "flex-end"}}> 
            <View style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    alignSelf: "stretch",
                    }}
                    >
           
            {
              this.state.loading ? 
              <Body>Loading playlists</Body> 
              : 
              <Picker
                selectedValue={this.state.selected}
                onValueChange={(itemValue, itemIndex) => {
                  const value = type === 'sound' ? soundFiles[itemIndex].file : itemValue;
                  this.selectValue(value, itemValue)}
                }>
                {
                  this.state.choices.map((p, idx) => {
                    return <Picker.Item 
                    key={'playlist-'+idx}
                    label={p.name} value={p.name} />
                  })
                } 
              </Picker>
            }
            </View>
              
          </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    );
  }
}

export default SoundPicker;
