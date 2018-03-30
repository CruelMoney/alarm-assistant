import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Picker, TouchableWithoutFeedback  } from 'react-native';
import iTunes from 'react-native-itunes';
import Body from './text/Body';
import Span from './text/Span';
import Link from './text/Link';

class SoundPicker extends Component {
  state={
    selected: false,
    choices: [],
    loading: false,
    visible: false,
  }

  selectValue = (val) => {
    const { onChange } = this.props;
    const { type } = this.state;
    !!onChange && onChange(type, val);

    this.setState({
      selected: val
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
      choices: [{name:'sound 1'}, {name:'sound 2'}, {name:'birds 1'}],
      loading: false
    }); 
  }

  render() {
    const {type} = this.state;

    return (
      <View style={{flexDirection: "column", alignSelf:"stretch",justifyContent:"space-around"}}>
        <View style={{flexDirection: "row", alignSelf:"stretch",justifyContent:"space-around"}}>
        <TouchableOpacity
        onPress={this.pickSound}
        >
          <Link>Sound</Link>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pickPlaylist}
        >
        <Link>Playlist</Link>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={
            type === 'sound' ?
            this.pickSound : this.pickPlaylist}
        >
          <Body style={{fontSize: 20, marginTop: 10}}>
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
                onValueChange={(itemValue, itemIndex) => this.selectValue(itemValue)}>
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
