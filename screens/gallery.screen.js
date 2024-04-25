import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getImageByName } from '../utils/get-image';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 50,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 6,
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

const Gallery = () => {
  const [isLoading, setLoading] = useState(true);
  const [galleryData, setGalleryData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchGalleryData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/romankovban/mobile-labs-data/master/gallery.json'
      );
      const responseData = await response.json();
      setGalleryData(responseData);
    } catch (err) {
      Alert.alert('Error', "Couldn't get photos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const openImageViewer = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

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
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetchGalleryData}
              />
            }
            data={galleryData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.column}
                onPress={() => openImageViewer(index)}
              >
                <Image
                  source={{
                    uri: getImageByName({
                      directory: 'gallery-images',
                      name: item.image,
                    }),
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          />
          <Modal visible={modalVisible} transparent={true}>
            <ImageViewer
              imageUrls={galleryData.map((item) => ({
                url: getImageByName({
                  directory: 'gallery-images',
                  name: item.image,
                }),
              }))}
              index={selectedIndex}
              enableSwipeDown={true}
              onSwipeDown={() => setModalVisible(false)}
            />
          </Modal>
        </View>
      )}
    </>
  );
};

export default Gallery;
