import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
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
  Put: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  modalButton: {
    width: 45,
    padding: 10,
    backgroundColor: '#BFB393',
    borderRadius: 25,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    borderColor: '#fff',
    marginLeft: 14,
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
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={() => PutList(props.item.id)}>
              <Text>Ok</Text>
            </TouchableOpacity>
            <TextInput style={styles.input} onChangeText={text => setTitle(text)} value={title} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.Put} onPress={() => setModalVisible(true)}>
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
