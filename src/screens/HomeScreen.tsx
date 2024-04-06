import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Carousal from '../components/Carousal';
// import AudioAssistant from '../components/AudioAssistant';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity
                style={styles.forumButton}
                    onPress={() => navigation.navigate('Forum')}
                >
                    <Text>Forum</Text>
                </TouchableOpacity>
            </View>
            {/* <AudioAssistant/> */}
            {/* <Carousal /> */}
            <Text style={styles.heading}>Choose an option:</Text>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Chat')}
            >
                <Text style={styles.cardTitle}>Chat</Text>
                <Text style={styles.cardDescription}>
                    Start a conversation with others and discuss legal matters or ask questions related to law.
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Lawyer')}
            >
                <Text style={styles.cardTitle}>Lawyer</Text>
                <Text style={styles.cardDescription}>
                    Get legal advice from professional lawyers regarding your legal rights, issues, or cases.
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#246BFD',
        alignItems: 'center',
        justifyContent: 'space-between', // Align items along the main axis with space in between
        marginBottom: 30,
        flexDirection: 'row',
        textAlign:"center"
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center', // Align the text itself to the center
        flex: 1,
        marginHorizontal:10
    },
    forumButton: {
        marginRight: 10, // Add margin to create space between "Home" and "Forum" button
    },

    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    card: {
        width: '75%',
        aspectRatio: 1.5,
        backgroundColor: '#246BFD',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginHorizontal: 40,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFFFFF',
    },
    cardDescription: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'left',
    },
});





export default HomeScreen;
