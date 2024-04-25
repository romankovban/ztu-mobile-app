import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 5,
  },
  text: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const Footer = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Roman Kovban</Text>
      </View>
    </>
  );
};

export default Footer;
