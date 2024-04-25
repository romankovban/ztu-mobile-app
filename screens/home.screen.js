import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getImageByName } from '../utils/get-image';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
});

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/romankovban/mobile-labs-data/master/news.json'
      );
      const data = await response.json();
      setNewsData(data);
    } catch (err) {
      Alert.alert('Error', "Couldn't get news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 15 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchNewsData} />
          }
          contentContainerStyle={styles.container}
          data={newsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NewsDetails', {
                  id: item.id,
                  title: item.title,
                  date: item.date,
                  excerpt: item.excerpt,
                  image: item.image,
                })
              }
            >
              <View style={styles.card}>
                <Image
                  source={{
                    uri: getImageByName({
                      directory: 'news-images',
                      name: item.image,
                    }),
                  }}
                  style={styles.image}
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

export default Home;
