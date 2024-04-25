import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 23,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 50,
  },
  title: {
    fontSize: 20,
    marginTop: 12,
  },
});

const Header = () => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/ztu-logo.png')}
          resizeMode="contain"
        />
        <Text style={styles.title}>ZTU Mobile App</Text>
      </View>
    </>
  );
};

export default Header;
