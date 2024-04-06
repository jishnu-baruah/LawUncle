import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';

interface CarousalItem {
    id: string;
    image: any; // Adjust the type based on the type of your image source
}

const Carousal: React.FC = () => {
    const screenWidth = Dimensions.get('window').width;
    const carousalData: CarousalItem[] = [
        {
            id: "01",
            image: require("../assets/Law1.jpg")
        },
        {
            id: "02",
            image: require("../assets/Law1.jpg")
        },
        {
            id: "03",
            image: require("../assets/Law1.jpg")
        },
    ];

    const renderItem = ({ item }: { item: CarousalItem }) => {
        return (
            <View style={styles.container}>
                <Image source={item.image} style={styles.image} />
                
                <Text style={styles.idText}>{item.id}</Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                horizontal
                data={carousalData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 200,
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: 'hidden', // Ensure the image stays within the container
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Adjust the image content mode as needed
    },
    idText: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 18,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add some background color for better visibility
        padding: 5,
        borderRadius: 5,
    },
});

export default Carousal;
