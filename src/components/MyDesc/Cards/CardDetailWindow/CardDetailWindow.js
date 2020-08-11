import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  addComment,
  addCommentThunk,
  addDescription,
  deleteCommentThunk,
  PutCommentThunk,
} from '../../../../redux/actions';
import ModalWindow from '../../ModalWindow';

function CardDetailWindow(props) {
  const [commentBody, setComment] = useState('');
  const [description, setDescription] = useState('');

  const { listTitle } = props.route.params;
  const { author } = props.route.params;
  const { cardId } = props.route.params;

  const comments = props.state.commentsReducer.filter(commentary => commentary.cardId === cardId);
  const card = props.state.cardsReducer.filter(postcard => postcard.id === cardId);

  function handleAddDescription() {
    props.addDescription(description, cardId);
    setDescription('');
  }

  function handleAddComment() {
    props.addCommentThunk(cardId, commentBody, props.state.authorReducer.token);
    setComment('');
  }

  function handlePutComment(CommentId, title) {
    props.PutCommentThunk(CommentId, title, props.state.authorReducer.token);
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
            <Text>Comment: {item.body}</Text>
            <Text>Author: {author}</Text>
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Text>delete</Text>
            </TouchableOpacity>
            <ModalWindow handlePut={handlePutComment} item={item} />
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
