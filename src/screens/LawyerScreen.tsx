import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import lawyerData from '../lawyerData';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

interface Lawyer {
  id: number;
  name: string;
  tags: string[];
  rating: number;
  feedbacks: { comment: string; rating: number }[];
  solvedCases: number;
}


type LawyerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Lawyer'>;

type Props = {
  navigation: LawyerScreenNavigationProp;
};


const LawyerScreen: React.FC<Props> = ({ navigation }) => {
  const [loadedItems, setLoadedItems] = useState(5);

  const renderLawyerItem = ({ item }: { item: Lawyer }) => (
    <View style={styles.lawyerContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <Text style={styles.feedback}>Feedback: {item.feedbacks.length}</Text>
      <Text style={styles.solvedCases}>Solved Cases: {item.solvedCases}</Text>
      <TouchableOpacity style={styles.callNowButton}
        onPress={() => navigation.navigate('HLogin')}

      >
        <Text style={styles.callNowText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );

  const loadMoreItems = () => {
    if (loadedItems < lawyerData.length) {
      setLoadedItems(loadedItems + 5);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pick Your Lawyer</Text>
      </View>
      <FlatList
        data={lawyerData.slice(0, loadedItems)}
        renderItem={renderLawyerItem}
        keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#121212', // Adjusted background color for consistency
  },
  flatList: {
    marginTop: 10,
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
  lawyerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF', // Adjusted border color for better visibility
    borderRadius: 10, // Added borderRadius for a cleaner look
    padding: 20, // Increased padding for better spacing
    // backgroundColor: '#1E1E1E', // Added background color for a darker theme
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    backgroundColor: '#246BFD', // Bluish background color for the name
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#2C2C2C',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  feedback: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  solvedCases: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  callNowButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  callNowText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});



export default LawyerScreen;
