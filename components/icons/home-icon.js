import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

export default HomeIcon = () => {
  return (
    <Image source={require('../../assets/home.png')} style={styles.icon} />
  );
};
