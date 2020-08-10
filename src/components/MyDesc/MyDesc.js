import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddListInput from './AddListInput/AddListInput';
import { removeListThunk, setColumns, getListsThunk, PutListThunk } from '../../redux/actions';

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const MyDesc = props => {
  useEffect(() => {
    props.getListsThunk(props.state.authorReducer.token);
  }, []);
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handlePutList(ListId) {
    props.PutListThunk(ListId, title, props.state.authorReducer.token);
    setTitle('');
    setModalVisible(!modalVisible);
  }

  const renderItem = ({ item }) => (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setTitle(text)}
              value={title}
            />
            <Button title="Ok" onPress={() => handlePutList(item.id)} />
          </View>
        </View>
      </Modal>
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
        <TouchableOpacity style={styles.delete} onPress={() => setModalVisible(true)}>
          <Text>Put</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
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
  PutListThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { setColumns, removeListThunk, getListsThunk, PutListThunk })(MyDesc);
