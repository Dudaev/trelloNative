import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native-web';
import PropTypes from 'prop-types';
import uid from 'uid';
import { addComment, addDescription } from '../../../../redux/actions';

function CardDetailWindow(props) {
  const [comment, setComment] = useState('');
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
    props.addComment({
      id: uid(),
      author,
      cardId,
      body: comment,
    });
    setComment('');
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

      <TextInput onChangeText={text => setComment(text)} value={comment} />
      <TouchableOpacity onPress={handleAddComment}>
        <Text>Add comment</Text>
      </TouchableOpacity>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View>
            <Text>Comment: {item.body}</Text>
            <Text>Author: {item.author}</Text>
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
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, {
  addDescription,
  addComment,
})(CardDetailWindow);
