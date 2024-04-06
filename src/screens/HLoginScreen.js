import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { MaterialIndicator } from 'react-native-indicators';
import { useLobby, useHuddle01, useEventListener } from '@huddle01/react-native/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import Images from '../components/Images';
import { API_KEY, PROJECT_ID } from '../constants';

const HLoginScreen = () => {
  const navigation = useNavigation();

  const [roomId, setRoomId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [isCreatingRoom, setCreatingRoom] = useState(false);
  const [isJoiningRoom, setJoiningRoom] = useState(false);

  const { initialize } = useHuddle01();
  const { joinLobby, isLoading, isLobbyJoined } = useLobby();

  useEffect(() => {
    initialize(PROJECT_ID);
  }, []);

  useEffect(() => {
    if (!isLoading && isLobbyJoined) {
      setCreatingRoom(false);
      setJoiningRoom(false);

      // Replace 'Lobby' with the actual screen name to navigate to
      navigation.replace('Lobby', { roomId });
    }
  }, [roomId, isLoading, isLobbyJoined]);

  useEventListener('lobby:failed', () => {
    console.log('useEventListener:- JoinLobbyFailed');
    // Handle lobby join failure
  });

  const createRoom = async (title) => {
    try {
      const response = await axios.post(
        'https://iriko.testing.huddle01.com/api/v1/create-room',
        {
          title: title || 'Huddle01-Test',
          hostWallets: [],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      console.error('Error creating room:', error);
      return undefined;
    }
  };

  const getRoomInfo = async (roomId) => {
    try {
      const response = await axios.get(
        `https://iriko.testing.huddle01.com/api/v1/meeting-details/${roomId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error getting room info:', error);
      return undefined;
    }
  };

  const onCreateMeeting = async () => {
    setCreatingRoom(true);
    const createdRoom = await createRoom();
    if (createdRoom) {
      setRoomId(createdRoom.roomId);
      joinLobby(createdRoom.roomId);
    }
  };

  const onJoinMeeting = async () => {
    setJoiningRoom(true);
    const roomInfo = await getRoomInfo(inputRoomId);
    if (roomInfo) {
      setRoomId(inputRoomId);
      joinLobby(inputRoomId);
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView />
      <View >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Connect with a lawyer</Text>
        </View>
        <KeyboardAwareScrollView style={{ marginTop: 20, marginHorizontal: 20 }} bounces={false}>
        

          {/* Create Meeting section */}
          <View style={{ ...styles.sectionContainer, backgroundColor: '#181A20' }}>
            <Text style={{ ...styles.sectionTitle, color: '#A199FF' }}>Meeting Space</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: isCreatingRoom ? undefined : '#246BFD', borderColor: isCreatingRoom ? '#246BFD' : undefined },
                ]}
                disabled={isCreatingRoom}
                onPress={onCreateMeeting}>
                {isCreatingRoom ? (
                  <View style={styles.progressHudContainer}>
                    <MaterialIndicator color="#246BFD" size={20} />
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Start Meeting</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Join Meeting section */}
          <View style={{ ...styles.sectionContainer, backgroundColor: '#181A20' }}>
            <Text style={{ ...styles.sectionTitle, color: '#A199FF' }}>Join a meeting</Text>
            <View style={styles.roomIdInputContainer}>
              <TextInput
                style={styles.roomIdInput}
                placeholder="Enter Room ID"
                placeholderTextColor="#5E6272"
                onChangeText={setInputRoomId}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: isJoiningRoom ? undefined : '#246BFD', borderColor: isJoiningRoom ? '#246BFD' : undefined },
                  !inputRoomId ? styles.disabledButton : undefined,
                ]}
                disabled={isJoiningRoom || !inputRoomId}
                onPress={onJoinMeeting}>
                {isJoiningRoom ? (
                  <View style={styles.progressHudContainer}>
                    <MaterialIndicator color="#246BFD" size={20} />
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Join Meeting</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'grey',
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#246BFD',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logo: {
    width: undefined,
    height: 25,
    marginLeft: 5,
    aspectRatio: 4.5,
  },
  sectionContainer: {
    width: '100%',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  roomIdInputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomIdInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: 'white',
  },
  progressHudContainer: {
    width: 30,
    height: 30,
    marginRight: 16,
    marginLeft: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#1C1E24',
    borderColor: 'transparent',
  },
});

export default HLoginScreen;
