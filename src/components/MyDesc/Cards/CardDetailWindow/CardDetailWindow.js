import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import {
  addCommentThunk,
  deleteCommentThunk,
  PutCardDescriptionThunk,
  PutCommentThunk,
} from '../../../../redux/actions';
import ModalWindow from '../../ModalWindow';
import Comment from './Comment';

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
    minHeight: 90,
    maxHeight: 100,
    backgroundColor: '#fff',
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
    alignItems: 'center',
  },
  inputComment: {
    height: 40,
    width: 250,
    marginLeft: 14,
  },
  swipeButton: {
    // height: 70,
  },
  delete: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: 59,
    width: 70,
    backgroundColor: '#AC5253',
    borderRadius: 5,
  },
  titleContainer: {
    backgroundColor: '#fff',
    height: 100,
  },
});
function CardDetailWindow(props) {
  const [commentBody, setComment] = useState('');
  // const [description, setDescription] = useState('');

  const { listTitle } = props.route.params;
  const { author } = props.route.params;
  const { cardId } = props.route.params;

  const comments = props.state.commentsReducer.filter(commentary => commentary.cardId === cardId);
  const card = props.state.cardsReducer.filter(postcard => postcard.id === cardId);

  function deleteDescription() {
    props.PutCardDescriptionThunk(cardId, '', props.state.authorReducer.token);
    // setDescription('');
  }

  function handleAddComment() {
    props.addCommentThunk(cardId, commentBody, props.state.authorReducer.token);
    setComment('');
  }

  function handlePutComment(CommentId, title) {
    props.PutCommentThunk(CommentId, title, props.state.authorReducer.token);
  }

  function handlePutDescription(id, title) {
    props.PutCardDescriptionThunk(id, title, props.state.authorReducer.token);
  }

  function handleDeleteComment(commentId) {
    props.deleteCommentThunk(commentId, props.state.authorReducer.token);
  }

  const leftButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <ModalWindow handlePut={handlePutDescription} item={card[0]} />
    </SwipeButtonsContainer>
  );
  const rightButtons = (
    <SwipeButtonsContainer
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <TouchableOpacity style={styles.delete} onPress={() => deleteDescription()}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );

  return (
    <View style={styles.container}>
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

      <View>
        <View style={styles.description}>
          <SwipeItem
            style={styles.swipeButton}
            swipeContainerStyle={styles.swipeContentContainerStyle}
            leftButtons={leftButton}
            rightButtons={rightButtons}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.textBlue}>DESCRIPTION</Text>
              <Text style={styles.text}>{card[0].description}</Text>
            </View>
          </SwipeItem>
        </View>
      </View>

      <View style={styles.comments}>
        <Text style={styles.textBlue}>COMMENTS</Text>
      </View>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <Comment
            author={author}
            handlePutComment={handlePutComment}
            item={item}
            handleDeleteComment={handleDeleteComment}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.addComment}>
        <TouchableOpacity onPress={handleAddComment}>
          <Image style={{ width: 30, height: 30 }} source={require('../../../../img/messageSquare3x.png')} />
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
