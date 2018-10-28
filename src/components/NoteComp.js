import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { ImagePicker, Permissions  } from 'expo';
import { addSessionNote } from '../redux/state/sessions/index';

class NoteComp extends Component {

    static navigationOptions = {
        title: 'Notes',
    };

    constructor(props) {
        super(props);
        this.sessionKey = this.props.navigation.getParam('sessionKey', '-1');
        this.state = {
            text: "",
            imageURI: undefined,
            hasCameraPermission: false,
            hasCameraRollPermission: false
        }
    }

    async componentDidMount() {
        this.setState({
            text: "",
            imageURI: undefined
        });
        
        for(let i = 0; i < this.props.notes.length; i++) {
            let item = this.props.notes[i]
            if(item.sessionId == this.sessionKey) {
                this.setState({
                    text: item.txtNote,
                    imageURI: item.imgNote
                });
                break;
            }
        }
    }

    saveNotes() {
        this.props.dispatch(
            addSessionNote(this.sessionKey, this.state.text, this.state.imageURI)
        );
    }

    async takePicture() {
        if(!this.state.hasCameraPermission) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ hasCameraPermission: status === 'granted' });
        }
        if(!this.state.hasCameraRollPermission) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            this.setState({ hasCameraRollPermission: status === 'granted' });
        }
        if(this.state.hasCameraPermission && this.state.hasCameraRollPermission) {
            let photo = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            if(!photo.cancelled) {
                this.setState({
                    imageURI: photo.uri
                });
            }
        }
    }

    async selectPicture() {
        let photo = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });    
        if(!photo.cancelled) {
            this.setState({
                imageURI: photo.uri
            });
        }  
    }

    render() {
        const windowWidth = Dimensions.get('window').width;

        return (
            <ScrollView style={{ backgroundColor: '#3d4746' }}>
                <View style={styles.container}>
                    <Text  style={styles.title} h1>Notes</Text>
                    <TextInput 
                        style={styles.txtInput}
                        multiline = {true}
                        numberOfLines = {5}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <Image
                        style={{
                            width: windowWidth - 48,
                            height: 400,
                            backgroundColor: 'white'
                        }}
                        source={{ uri: this.state.imageURI }}
                    />
                </View>
                <Button
                    title="Enregistrer"
                    buttonStyle={{
                    backgroundColor: '#bf5022',
                    width: 200,
                    height: 45,
                    borderColor: '#ffffff',
                    borderRadius: 100,
                    borderWidth: 0,
                    elevation: 0,
                    alignSelf: 'center',
                    marginBottom: 20
                    }}
                    onPress={this.saveNotes.bind(this)}
                />
                <Button
                    title="Prendre une photo"
                    buttonStyle={{
                    backgroundColor: '#bf5022',
                    width: 300,
                    height: 45,
                    borderColor: '#ffffff',
                    borderRadius: 100,
                    borderWidth: 0,
                    elevation: 0,
                    alignSelf: 'center',
                    marginBottom: 20
                    }}
                    onPress={this.takePicture.bind(this)}
                />
                <Button
                    title="Sélectionner une photo depuis la galerie"
                    buttonStyle={{
                    backgroundColor: '#bf5022',
                    width: 300,
                    height: 45,
                    borderColor: '#ffffff',
                    borderRadius: 100,
                    borderWidth: 0,
                    elevation: 0,
                    alignSelf: 'center',
                    marginBottom: 45
                    }}
                    onPress={this.selectPicture.bind(this)}
                />
            </ScrollView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#3d4746'
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '700'
    },
    txtInput: {
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 20
    }
});

const mapStateToProps = state => ({
    notes: state.sessions.notes
  });

export default connect(mapStateToProps, null)(NoteComp);
  