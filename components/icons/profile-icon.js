import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});

export default ProfileIcon = () => {
  return (
    <Image source={require('../../assets/profile.png')} style={styles.icon} />
  );
};
