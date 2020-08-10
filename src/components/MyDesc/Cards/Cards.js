import React, { useState } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Modal, Button, Alert, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { removeCardThunk, PutCardThunk } from '../../../redux/actions';
import AddCardInput from './AddCardInput/AddCardInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  delete: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#AC5253',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardTitle: {
    flex: 9,
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

const Cards = props => {
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { listTitle } = props.route.params;
  const { listId } = props.route.params;
  const cards = props.state.cardsReducer.filter(card => card.columnId === listId);

  function handlePutList(ListId) {
    props.PutCardThunk(ListId, title, props.state.authorReducer.token);
    setTitle('');
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <AddCardInput listId={listId} />
      <FlatList
        data={cards}
        renderItem={({ item }) => (
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
              style={styles.card}
              onPress={() =>
                props.navigation.navigate('CardDetailWindow', {
                  listTitle,
                  cardId: item.id,
                  cardTitle: item.title,
                  cardDescription: item.description,
                  author: props.state.authorReducer.name,
                })
              }
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => props.removeCardThunk(item.id, props.state.authorReducer.token)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.delete} onPress={() => setModalVisible(true)}>
                <Text>Put</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

Cards.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object,
  route: PropTypes.object,
  getCards: PropTypes.func,
  removeCardThunk: PropTypes.func,
  PutCardThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { removeCardThunk, PutCardThunk })(Cards);
