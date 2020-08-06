import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddListInput from './AddListInput/AddListInput';
import { removeListThunk, setColumns, getListsThunk } from '../../redux/actions';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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

const MyDesc = props => {
  useEffect(() => {
    props.getListsThunk(props.state.authorReducer.token);
  }, []);

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
      <TouchableOpacity
        style={styles.delete}
        onPress={() => props.removeListThunk(item.id, props.state.authorReducer.token)}
      >
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
        <FlatList data={props.state.columnsReducer} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    </View>
  );
};

MyDesc.propTypes = {
  state: PropTypes.object,
  item: PropTypes.object,
  navigation: PropTypes.object,
  getColumns: PropTypes.func,
  removeListThunk: PropTypes.func,
  getListsThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { setColumns, removeListThunk, getListsThunk })(MyDesc);
