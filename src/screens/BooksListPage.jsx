import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BookCard from '../components/BookCard';

export default function BooksListPage(){
  const url = "https://t3t4-dfe-pb-grl-m1-default-rtdb.firebaseio.com";
  const resource = "/books.json";
  const uri = url + resource;
  const [products, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(uri)
      .then((res) => res.json())
      .then((data) => {
        const convertedBooks = converter(data);
        setBooks(convertedBooks);
        setFilteredBooks(convertedBooks);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const navigation = useNavigation();

  function converter(data) {
    const ids = Object.keys(data);
    const objs = Object.values(data);
    return objs.map((obj, i) => {
      return { id: ids[i], ...obj };
    });
  }

  const filterBooks = (text) => {
    const filtered = products.filter(product =>
        product.title.toLowerCase().includes(text.toLowerCase()) ||
        product.author.toLowerCase().includes(text.toLowerCase()) ||
        product.genre.toLowerCase().includes(text.toLowerCase()) 
    );
    setFilter(text);
    setFilteredBooks(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Galeria')}
        >
          <Text style={styles.buttonText}>Galeria</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size='large' style={{flex: 1}} />
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Buscar por: Título, autor ou categoria..."
            value={filter}
            onChangeText={filterBooks}
          />
          
          <FlatList
            data={filteredBooks}
            renderItem={({ item }) => <BookCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    ...Platform.select({
      android: {
        backgroundColor: '#52796f',
      },
      ios: {
        backgroundColor: '#4a4e69',
      },
      default: {
        backgroundColor: '#353535',
      }
    }),
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
