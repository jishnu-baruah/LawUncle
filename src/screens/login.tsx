import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../navigation';
// import LoginLogo from '../assets/Law_uncle.png';
// import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const webClientId = "796440690362-vtvocb9vl8kgkc0jbqiv5v4du5nvuanj.apps.googleusercontent.com";
const androidClientId = "796440690362-ec9jkc1hsml4cicrdst3utjiqis1ja96.apps.googleusercontent.com";


const LoginScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      scopes: ["email", "profile"],
      webClientId: webClientId,
      // androidClientId: androidClientId,
    });
  }

  useEffect(() => {
    configureGoogleSignIn();
    // setLoading(false);
  }, []);

  // async function handleGoogleSignIn() {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const response = await GoogleSignin.signIn();
  //     const { idToken, user } = response;
  //     // Handle successful sign-in
  //     console.log("Google Sign-In Success:", user);
  //   } catch (error) {
  //     console.error("Google Sign-In Error:", error);
  //     // Handle error using type assertion
  //     // const signInError = error as GoogleSignin.SignInError;
  //     // console.log("Error code:", signInError.code);
  //   }
  // }
  // async function onGoogleButtonPress() {
  //   console.log("called function onGoogleButtonPress");
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }

  // const signIn = async () => {
  //   console.log("called function signIn");
  //   try {
  //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //     const userInfo = await GoogleSignin.signIn();
  //     setUser(userInfo);
  //   } catch (error) {
  //     console.log('Error signing in with Google:', error);
  //   }
  // }

  return (
    <View style={styles.container}>
    {/* //   <Image source={require('../assets/Law_uncle.png')} style={{ height: 180, width: 200 }} />
    //   <Image source={require('../assets/Law_Uncle_Tag.png')} style={{ height: 60, width: 250, marginTop: 10, marginBottom: 50 }} /> */}
      <Text style={styles.logo}>Law Uncle</Text>
      <Text style={styles.tagline}>Know Your Rights</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          // () => {
          navigation.navigate("Home");
          // signIn().then(() => console.log('Signed in with Google!'))
          // handleGoogleSignIn()
          //  onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
          // }
        }}
      >
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <Text style={styles.description}><Text style={styles.underline}>By DevUncles</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  logo: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 0,
  },
  tagline: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#246BFD",
    width: "65%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 50, // Adjusted marginTop for spacing
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 12,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});



export default LoginScreen;
