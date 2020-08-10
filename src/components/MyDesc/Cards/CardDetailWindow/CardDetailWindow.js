import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TouchableHighlight,
  Alert,
  StyleSheet,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  addComment,
  addCommentThunk,
  addDescription,
  deleteCommentThunk,
  PutCommentThunk,
} from '../../../../redux/actions';

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
});
function CardDetailWindow(props) {
  const [commentBody, setComment] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { listTitle } = props.route.params;
  const { author } = props.route.params;
  const { cardId } = props.route.params;

  const comments = props.state.commentsReducer.filter(commentary => commentary.cardId === cardId);
  const card = props.state.cardsReducer.filter(card => card.id === cardId);

  function handleAddDescription() {
    props.addDescription(description, cardId);
    setDescription('');
  }

  function handleAddComment() {
    props.addCommentThunk(cardId, commentBody, props.state.authorReducer.token);
    setComment('');
  }

  function handlePutComment(CommentId) {
    props.PutCommentThunk(CommentId, commentBody, props.state.authorReducer.token);
    setComment('');
    setModalVisible(!modalVisible);
  }

  function handleDeleteComment(commentId) {
    props.deleteCommentThunk(commentId, props.state.authorReducer.token);
  }

  return (
    <View>
      <View>
        <Text>CardHeader: {card[0].title}</Text>
      </View>

      <View>
        <Text>in list: {listTitle}</Text>
      </View>

      <View>
        <Text>Author: {author}</Text>
      </View>

      <View>
        <Text>Description: {card[0].description}</Text>
      </View>

      <TextInput onChangeText={text => setDescription(text)} value={description} />
      <TouchableOpacity onPress={handleAddDescription}>
        <Text>Save description</Text>
      </TouchableOpacity>

      <TextInput onChangeText={text => setComment(text)} value={commentBody} />
      <TouchableOpacity onPress={handleAddComment}>
        <Text>Add comment</Text>
      </TouchableOpacity>
      <FlatList
        data={comments}
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
                    onChangeText={text => setComment(text)}
                    value={commentBody}
                  />
                  <Button title="Ok" onPress={() => handlePutComment(item.id)} />
                </View>
              </View>
            </Modal>
            <Text>Comment: {item.body}</Text>
            <Text>Author: {author}</Text>
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Text>delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>Put</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

CardDetailWindow.propTypes = {
  state: PropTypes.object,
  route: PropTypes.object,
  addDescription: PropTypes.func,
  addComment: PropTypes.func,
  cardId: PropTypes.string,
  addCommentThunk: PropTypes.string,
  deleteCommentThunk: PropTypes.string,
  PutCommentThunk: PropTypes.string,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, {
  addDescription,
  addComment,
  addCommentThunk,
  deleteCommentThunk,
  PutCommentThunk,
})(CardDetailWindow);
