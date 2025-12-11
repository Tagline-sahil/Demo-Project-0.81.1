import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

interface User {
  id: string;
  name: string;
  age: string;
  mobile: string;
}

const UserDetailsScreen = () => {
  const [allUser, setAllUser] = useState(null);
  console.log('🚀 ~ UserDetailsScreen ~ allUser:', allUser);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectValue, setSelectValue] = useState(false);
  const [selectValueId, setSelectValueId] = useState('');
  console.log('🚀 ~ UserDetailsScreen ~ selectValueId:', selectValueId);
  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        setAllUser(querySnapshot.docs);
      });
    return unsubscribe;
  }, []);

  const submitData = () => {
    console.log('🚀 ~ submitData ~ else==================>');
    firestore().collection('users').doc().set({
      name,
      age,
      mobile,
    });
    inputRef.current?.focus();
    setName('');
    setAge('');
    setMobile('');
  };

  const selectUserData = (item: User) => {
    setSelectValue(true);
    setSelectValueId(item.id);
    setName(item.name);
    setAge(item.age);
    setMobile(item.mobile);
  };

  const updateUserDetails = () => {
    firestore().collection('users').doc(selectValueId).update({
      name,
      age,
      mobile,
    });
    inputRef.current?.focus();
    setSelectValue(false);
    setSelectValueId('');
    setName('');
    setAge('');
    setMobile('');
  };

  const deleteUSerData = id => {
    firestore().collection('users').doc(id).delete();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
        <TextInput
          ref={inputRef}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.textInputStyle}
          inputMode="text"
        />
        <TextInput
          placeholder="Enter age"
          value={age}
          onChangeText={setAge}
          style={styles.textInputStyle}
          inputMode="numeric"
        />
        <TextInput
          placeholder="Enter mobile"
          value={mobile}
          onChangeText={setMobile}
          style={[styles.textInputStyle, { marginBottom: 20 }]}
          inputMode="numeric"
        />
        {selectValue ? (
          <Button title="Update" onPress={updateUserDetails} />
        ) : (
          <Button title="Submit" onPress={submitData} />
        )}

        <FlatList
          data={allUser}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyTextStyle}>No users added yet</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.dataContainer}>
              <Text style={styles.inputTextStyle}>
                Name:- {item._data.name}
              </Text>
              <Text style={styles.inputTextStyle}>Age:- {item._data.age}</Text>
              <Text style={styles.inputTextStyle}>
                Mobile:- {item._data.mobile}
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => selectUserData(item)}
                  title={
                    selectValue && item.id === selectValueId
                      ? 'selected'
                      : 'Update'
                  }
                />
                <Button
                  onPress={() => deleteUSerData(item.id)}
                  title="Delete"
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  textInputStyle: {
    marginHorizontal: 20,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  emptyTextStyle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    opacity: 0.6,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    elevation: 10,
    shadowColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  inputTextStyle: {
    fontSize: 18,
    opacity: 0.6,
  },
});
