import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BookCard({ item }) {
  const { title, author, price, cover } = item;

  const handlePress = () => {
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.containerImg}>
        <Image style={styles.img} source={{uri: cover}} />
      </View>
      <View style={styles.containerDescricao}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.price}>R$ {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    margin: 2,
    flexDirection: 'row',
    gap: 10
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  containerImg: {
    alignItems: 'center',
  },
  containerDescricao: {
    flexGrow: 1,
    width: '65%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
