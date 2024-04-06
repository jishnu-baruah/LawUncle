// import React, { useState, useEffect } from 'react';
// import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import RNFS from 'react-native-fs';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const AudioAssistant = () => {
//     const [recording, setRecording] = useState(null);
//     const [recordingStatus, setRecordingStatus] = useState('idle');

//     useEffect(() => {
//         return () => {
//             if (recording) {
//                 stopRecording();
//             }
//         };
//     }, []);

//     const startRecording = async () => {
//         try {
//             const path = `${RNFS.DocumentDirectoryPath}/recording-${Date.now()}.caf`;
//             await audioRecorderPlayer.startRecorder(path);
//             setRecording(path);
//             setRecordingStatus('recording');
//         } catch (error) {
//             console.error('Failed to start recording', error);
//         }
//     };

//     const stopRecording = async () => {
//         try {
//             if (recordingStatus === 'recording' && recording) {
//                 await audioRecorderPlayer.stopRecorder();
//                 // Play the recorded audio
//                 await audioRecorderPlayer.startPlayer(recording);
//                 setRecording(null);
//                 setRecordingStatus('stopped');
//             }
//         } catch (error) {
//             console.error('Failed to stop recording', error);
//         }
//     };

//     const handleRecordButtonPress = async () => {
//         if (recording) {
//             await stopRecording();
//         } else {
//             await startRecording();
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
//                 <Icon name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
//             </TouchableOpacity>
//             <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     button: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 128,
//         height: 128,
//         borderRadius: 64,
//         backgroundColor: 'red',
//     },
//     recordingStatusText: {
//         marginTop: 16,
//     },
// });

// export default AudioAssistant;
