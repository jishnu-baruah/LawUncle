import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { useAcl } from '@huddle01/react/hooks';
import { useAppUtils } from '@huddle01/react/app-utils';
import { useHuddle01, useAudio, useVideo, usePeers, useRoom } from '@huddle01/react-native/hooks';
import Images from '../components/Images';
import HGridLayout from '../components/Layouts/HGridLayout';
import HSpeakerLayout from '../components/Layouts/HSpeakerLayout';
import CallManager from '../utils/CallManager';

const RoomScreen = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;

  useEffect(() => {
    CallManager.start();

    return () => {
      CallManager.stop();
    };
  }, []);

  const leaveRoomAndNavigate = () => {
    console.log("leaving room");
    CallManager.stop(); // Stop any ongoing calls or related functionalities
    navigation.navigate('Login'); // Navigate to Login screen
  };

  const [isMicOn, setMicOn] = useState(params.isMicOn);
  const [isCameraOn, setCameraOn] = useState(params.isCameraOn);
  const [layout, setLayout] = useState('auto');
  const { me, roomState } = useHuddle01();
  const { fetchAudioStream, produceAudio, stopProducingAudio, stream: micStream } = useAudio();
  const { fetchVideoStream, produceVideo, stopProducingVideo, stream: camStream } = useVideo();
  const { roomId, leaveRoom } = useRoom();
  const { peers } = usePeers();
  const { changePeerRole, sendData } = useAcl();
  const { setDisplayName } = useAppUtils();

  useEffect(() => {
    console.log({ me, roomState });
  }, [me, roomState]);

  useEffect(() => {
    console.log('Room Id: ', roomId);
  }, [roomId]);

  useEffect(() => {
    if (isCameraOn) {
      if (camStream) {
        produceVideo(camStream);
      } else {
        fetchVideoStream();
      }
    } else {
      stopProducingVideo();
    }
  }, [isCameraOn, camStream]);

  useEffect(() => {
    if (isMicOn) {
      if (micStream) {
        produceAudio(micStream);
      } else {
        fetchAudioStream();
      }
    } else {
      stopProducingAudio();
    }
  }, [isMicOn, micStream]);

  const onCamera = () => {
    const newValue = !isCameraOn;
    setCameraOn(newValue);
  };

  const onMic = () => {
    const newValue = !isMicOn;
    setMicOn(newValue);
  };

  const onSetDisplayName = () => {
    setDisplayName('Tester');
  };

  const onChangeRole = () => {
    changePeerRole('<Peer-Id>', 'coHost');
  };

  const onSendMessage = () => {
    sendData('*', { message: 'Hello World' });
  };

  const onDisconnect = () => {
    leaveRoom();
    navigation.navigate('Home');
  };

  const mePeer = {
    camStream: isCameraOn ? camStream : undefined,
    micStream: isMicOn ? micStream : undefined,
  };

  const renderBottomButton = (icon, onPress) => {
    return (
      <TouchableOpacity style={styles.bottomBtn} onPress={onPress}>
        <Image style={styles.bottomBtnIcon} source={icon} />
      </TouchableOpacity>
    );
  };

  const renderBottomTool = () => {
    return (
      <View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomInnerShadow} />
          <View style={styles.bottomOutterShadow} />
          {renderBottomButton(
            isCameraOn ? Images.ic_camera_on : Images.ic_camera_off,
            onCamera,
          )}
          {renderBottomButton(
            isMicOn ? Images.ic_mic_on : Images.ic_mic_off,
            onMic,
          )}
          {renderBottomButton(Images.ic_disconnect, onDisconnect)}
        </View>
        <SafeAreaView />
      </View>
    );
  };

  let currentLayout = layout;
  if (currentLayout === 'auto') {
    if (Object.keys(peers).length < 2) {
      currentLayout = 'speaker';
    } else {
      currentLayout = 'grid';
    }
  }

  return (
    <View style={styles.root}>
      <SafeAreaView />
      <View style={styles.container}>
        {currentLayout === 'grid' && (
          <HGridLayout
            peers={peers}
            viewportBgColor={'#181A20'}
            peerNameColor={'#E2E8F0'}
            me={mePeer}
            renderBottomTool={renderBottomTool}
          />
        )}
        {currentLayout === 'speaker' && (
          <HSpeakerLayout
            peers={peers}
            viewportBgColor={'#181A20'}
            peerNameColor={'#E2E8F0'}
            me={mePeer}
            renderBottomTool={renderBottomTool}
            onGrid={() => setLayout('grid')}
          />
        )}
      </View>

      <Text style={styles.roomId}>{params.roomId}</Text>
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'grey',
    flex: 1,
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  roomId: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: 55,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: '#181A20',
    elevation: 1,
  },
  bottomOutterShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#181A20',
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 1,
  },
  bottomInnerShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#181A20',
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  bottomBtn: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBtnIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default RoomScreen;
