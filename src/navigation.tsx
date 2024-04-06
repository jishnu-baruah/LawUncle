// Navigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HLoginScreen from './screens/HLoginScreen';
import LobbyScreen from './screens/LobbyScreen';
import RoomScreen from './screens/RoomScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LawyerScreen from './screens/LawyerScreen';
import LoginScreen from './screens/login';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    HLogin: undefined;
    Chat: undefined;
    Lawyer: undefined;
    Room: undefined;
    Lobby: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="HLogin" component={HLoginScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Lawyer" component={LawyerScreen} />
            <Stack.Screen name="Room" component={RoomScreen} />
            <Stack.Screen name="Lobby" component={LobbyScreen} />
        </Stack.Navigator>
    );
}
