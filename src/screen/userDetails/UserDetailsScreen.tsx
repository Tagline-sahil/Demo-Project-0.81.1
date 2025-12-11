import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

interface User {
  name: string;
  age: string;
  mobile: string;
}

const UserDetailsScreen = () => {
  const [name, setName] = useState('');
  //   const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectValue, setSelectValue] = useState(false);
  const [selectValueId, setSelectValueId] = useState('');
  const inputRef = useRef(null);

  const submitData = () => {
    firestore().collection('users').doc().set({
      name,
      age,
      mobile,
    });
    inputRef.current?.focus();
    setName('');
    // setEmail('');
    setAge('');
    setMobile('');
  };

  //   const selectUserData = (item: User) => {
  //     setSelectValue(true);
  //     setSelectValueId(item.id);
  //     setName(item.name);
  //     setEmail(item.email);
  //     setAge(item.age);
  //     setMobile(item.mobile);
  //   };

  const updateUserDetails = () => {
    inputRef.current?.focus();
    setSelectValue(false);
    setSelectValueId('');
    setName('');
    // setEmail('');
    setAge('');
    setMobile('');
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
        {/* <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInputStyle}
          inputMode="email"
        /> */}
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

        {/* <FlatList
        data={allUser}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 18,
              opacity: 0.6,
            }}
          >
            No users added yet
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              marginBottom: 5,
              elevation: 10,
              shadowColor: 'black',
            }}
          >
            <Text style={{ fontSize: 18 }}>Name:- {item.name}</Text>
            <Text style={{ fontSize: 18 }}>Email:- {item.email}</Text>
            <Text style={{ fontSize: 18 }}>Age:- {item.age}</Text>
            <Text style={{ fontSize: 18 }}>Mobile:- {item.mobile}</Text>
            <View
              style={{
                // backgroundColor: 'red',
                height: 50,
                width: width - 30,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <Button mode="contained" onPress={() => selectUserData(item)}>
                {selectValue && item.id === selectValueId
                  ? 'selected'
                  : 'Update'}
              </Button>
              <Button
                mode="contained"
                onPress={() => dispatch(deleteUser(item.id))}
              >
                Delete
              </Button>
            </View>
          </View>
        )}
      /> */}
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
});
