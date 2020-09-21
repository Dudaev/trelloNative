import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';
import uid from 'uid';
import { connect } from 'react-redux';
import { addList } from '../../../redux/actions';

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
  input: {
    height: 40,
    width: 250,
    borderColor: '#fff',
    marginLeft: 14,
  },
});

const AddListInput = props => {
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleAddAndHide() {
    props.addListThunk(uid(), title, props.state.authorReducer.token);
    setTitle('');
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => handleAddAndHide()}>
              <Image style={{ width: 20, height: 20 }} source={require('../../../img/add.png')} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={text => setTitle(text)}
              placeholder="Add a list..."
              placeholderTextColor="#9C9C9C"
              value={title}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={{ width: 20, height: 20 }} source={require('../../../img/Union.png')} />
      </TouchableOpacity>
    </View>
  );
};

AddListInput.propTypes = {
  state: PropTypes.object,
  item: PropTypes.object,
  addListThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, { addListThunk: addList })(AddListInput);
