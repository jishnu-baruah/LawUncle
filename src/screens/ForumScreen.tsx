import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import demoForumData from '../demoForumData';

interface ForumPost {
    userId: number;
    userDisplayName: string;
    postId: number;
    textBody: string;
    agreeCount: number;
    disagreeCount: number;
}

type ForumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Forum'>;

type Props = {
    navigation: ForumScreenNavigationProp;
};

const ForumScreen: React.FC<Props> = ({ navigation }) => {
    const [loadedItems, setLoadedItems] = useState(5);

    const renderForumPostItem = ({ item }: { item: ForumPost }) => (
        <View style={styles.forumPostContainer}>
            <Text style={styles.userDisplayName}>{item.userDisplayName}</Text>
            <View style={{borderBottomColor:"#000",borderBottomWidth:1}}>
                <Text style={styles.textBody}>{item.textBody}</Text>
            </View>
            
            <View style={styles.reactionContainer}>
                <Text style={styles.agreeCount}>Agree: {item.agreeCount}</Text>
                <Text style={styles.disagreeCount}>Disagree: {item.disagreeCount}</Text>
            </View>
        </View>
    );

    const loadMoreItems = () => {
        if (loadedItems < demoForumData.length) {
            setLoadedItems(loadedItems + 5);
        }
    };

    const handleAddPost = () => {
        // Navigate to the screen where users can add a new post
        // Replace 'AddPost' with the actual screen name
        // navigation.navigate('AddPost');
    };

    return (
        <View style={styles.container}>
            {/* Header with Add button */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Forum</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* FlatList of forum posts */}
            <FlatList
                data={demoForumData.slice(0, loadedItems)}
                renderItem={renderForumPostItem}
                keyExtractor={(item) => item.postId.toString()}
                style={styles.flatList}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#181A20', // Match HLoginScreen color theme
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    addButton: {
        backgroundColor: '#246BFD', // Match HLoginScreen primary color
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    flatList: {
        marginTop: 10,
    },
    forumPostContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    userDisplayName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        backgroundColor: '#246BFD', // Blusish background color
        paddingVertical: 5, // Added padding for better appearance
        paddingHorizontal: 10, // Added padding for better appearance
        color: '#FFFFFF', // White text color
        borderRadius: 8, // Added borderRadius for better appearance
    },
    textBody: {
        fontSize: 14,
        marginBottom: 10,
        color: '#000', // Updated to match HLoginScreen
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10, // Adjust as needed
    },
    reactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    agreeCount: {
        color: 'green',
    },
    disagreeCount: {
        color: 'red',
    },
});




export default ForumScreen;
