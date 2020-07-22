import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-web';
import PropTypes from 'prop-types';
import AddListInput from './AddListInput/AddListInput';
// import Cards from './Cards/Cards';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  listTitle: {
    flex: 9,
  },
  delete: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#AC5253',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});

export default function MyDesc(props) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.list}
      onPress={() =>
        props.navigation.navigate('Cards', {
          listId: item.id,
          listTitle: item.title,
        })
      }
    >
      <Text style={styles.listTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.delete} onPress={() => props.removeList(item.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <AddListInput />
      </View>
      <View>
        <FlatList data={props.columns} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    </View>
  );
}

MyDesc.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
  removeList: PropTypes.func,
  columns: PropTypes.array,
};
