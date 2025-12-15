import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/requests/productRequests';

const ApiJsonDataScreen = () => {
  const [products, setProducts] = useState([]);
  console.log('🚀 ~ ApiJsonDataScreen ~ products:', products);

  const getAllData = async () => {
    const data = await getAllProducts();
    if (data) {
      setProducts(data);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>ApiJsonDataScreen</Text>
    </View>
  );
};

export default ApiJsonDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
