import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native-web';
import PropTypes from 'prop-types';
import { addComment, addCommentThunk, addDescription, deleteCommentThunk } from '../../../../redux/actions';

function CardDetailWindow(props) {
  const [commentBody, setComment] = useState('');
  const [description, setDescription] = useState('');

  const { listTitle } = props.route.params;
  const { cardTitle } = props.route.params;
  const { cardDescription } = props.route.params;
  const { author } = props.route.params;
  const { cardId } = props.route.params;

  const comments = props.state.commentsReducer.filter(commentary => commentary.cardId === cardId);

  function handleAddDescription() {
    props.addDescription(description, cardId);
    setDescription('');
  }

  function handleAddComment() {
    props.addCommentThunk(cardId, commentBody, props.state.authorReducer.token);
    setComment('');
  }

  function handleDeleteComment(commentId) {
    props.deleteCommentThunk(commentId, props.state.authorReducer.token);
  }

  return (
    <View>
      <View>
        <Text>CardHeader: {cardTitle}</Text>
      </View>

      <View>
        <Text>in list: {listTitle}</Text>
      </View>

      <View>
        <Text>Author: {author}</Text>
      </View>

      <View>
        <Text>Description: {cardDescription}</Text>
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
            <Text>Author: {item.author}</Text>
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Text>delete</Text>
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
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, {
  addDescription,
  addComment,
  addCommentThunk,
  deleteCommentThunk,
})(CardDetailWindow);
