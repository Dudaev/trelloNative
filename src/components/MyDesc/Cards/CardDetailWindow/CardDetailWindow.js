import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  addCommentThunk,
  deleteCommentThunk,
  PutCardDescriptionThunk,
  PutCommentThunk,
} from '../../../../redux/actions';
import ModalWindow from '../../ModalWindow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  authorAndList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    height: 108,
  },
  inList: {
    flex: 1,
    justifyContent: 'center',
  },
  author: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
  },
  description: {
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  colorText: {
    color: '#BFB393',
    fontSize: 22,
    paddingHorizontal: 15,
  },
  text: {
    paddingHorizontal: 15,
    color: '#514D47',
  },
  textBlue: {
    color: '#72A8BC',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  comments: {
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  avatar: {
    paddingRight: 15,
  },
  nameAndText: {
    // d
  },
  authorNameText: {
    color: '#514D47',
    fontSize: 17,
    fontWeight: 'bold',
  },
  comment: {
    color: '#514D47',
    fontSize: 17,
  },
  addComment: {
    flexDirection: 'row',
    padding: 15,
    // alignItems: 'center',
  },
  inputComment: {
    height: 40,
    width: 250,
    // borderColor: '#fff',
    marginLeft: 14,
  },
});
function CardDetailWindow(props) {
  const [commentBody, setComment] = useState('');
  const [description, setDescription] = useState('');

  const { listTitle } = props.route.params;
  const { author } = props.route.params;
  const { cardId } = props.route.params;

  const comments = props.state.commentsReducer.filter(commentary => commentary.cardId === cardId);
  const card = props.state.cardsReducer.filter(postcard => postcard.id === cardId);

  function handleAddDescription() {
    props.PutCardDescriptionThunk(cardId, description, props.state.authorReducer.token);
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
    <View style={styles.container}>
      {/* <View>
        <Text>CardHeader: {card[0].title}</Text>
      </View>
      имя карточки будет в заголовке */}

      <View style={styles.authorAndList}>
        <View style={styles.inList}>
          <Text style={styles.colorText}>{listTitle}</Text>
          <Text style={styles.text}>in list</Text>
        </View>

        <View style={styles.author}>
          <View>
            <Text style={styles.colorText}>{author}</Text>
          </View>
          <View>
            <Text style={styles.text}>Author</Text>
          </View>
        </View>
      </View>

      <View style={styles.description}>
        <Text style={styles.textBlue}>DESCRIPTION</Text>
        <Text style={styles.text}>{card[0].description}</Text>
        {/* <TextInput onChangeText={text => setDescription(text)} value={description} />
        <TouchableOpacity onPress={handleAddDescription}>
          <Text>Save description</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.comments}>
        <Text style={styles.textBlue}>COMMENTS</Text>
      </View>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View>
            {/* <Text>Comment: {item.body}</Text>
            <Text>Author: {author}</Text> */}
            <View style={styles.commentContainer}>
              <View style={styles.avatar}>
                <Image style={{ width: 35, height: 40 }} source={require('../../../../img/user3x.png')} />
              </View>
              <View style={styles.nameAndText}>
                <View>
                  <Text style={styles.authorNameText}>{author}</Text>
                </View>
                <View>
                  <Text style={styles.comment}>{item.body}</Text>
                </View>
              </View>
            </View>
            {/* <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Text>delete</Text>
            </TouchableOpacity>
            <ModalWindow handlePut={handlePutComment} item={item} /> */}
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.addComment}>
        <TouchableOpacity onPress={handleAddComment}>
          <Image style={{ width: 35, height: 40 }} source={require('../../../../img/add.png')} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputComment}
          onChangeText={text => setComment(text)}
          value={commentBody}
          placeholder="Add a card..."
          placeholderTextColor="#9C9C9C"
        />
      </View>
    </View>
  );
}

CardDetailWindow.propTypes = {
  state: PropTypes.object,
  route: PropTypes.object,
  cardId: PropTypes.string,
  addCommentThunk: PropTypes.string,
  deleteCommentThunk: PropTypes.string,
  PutCommentThunk: PropTypes.string,
  PutCardDescriptionThunk: PropTypes.string,
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps, {
  addCommentThunk,
  deleteCommentThunk,
  PutCommentThunk,
  PutCardDescriptionThunk,
})(CardDetailWindow);
