import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

export default GalleryIcon = () => {
  return (
    <Image source={require('../../assets/gallery.png')} style={styles.icon} />
  );
};
