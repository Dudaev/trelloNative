import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
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
  delete: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#AC5253',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});

const ModalWindow = props => {
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function PutList(ListId) {
    props.handlePut(ListId, title);
    setTitle('');
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setTitle(text)}
              value={title}
            />
            <Button title="Ok" onPress={() => PutList(props.item.id)} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.delete} onPress={() => setModalVisible(true)}>
        <Text>Put</Text>
      </TouchableOpacity>
    </View>
  );
};

ModalWindow.propTypes = {
  item: PropTypes.object,
  handlePut: PropTypes.func,
};

export default ModalWindow;
