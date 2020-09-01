import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
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
    height: 70,
    backgroundColor: '#fff',
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
    height: 70,
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
});

const Comment = props => {
  const leftButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <ModalWindow handlePut={props.handlePutComment} item={props.item} />
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
      <TouchableOpacity style={styles.delete} onPress={() => props.handleDeleteComment(props.item.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );
  return (
    <View>
      <SwipeItem
        style={styles.swipeButton}
        swipeContainerStyle={styles.swipeContentContainerStyle}
        leftButtons={leftButton}
        rightButtons={rightButtons}
      >
        <View style={styles.commentContainer}>
          <View style={styles.avatar}>
            <Image style={{ width: 35, height: 40 }} source={require('../../../../img/user3x.png')} />
          </View>
          <View style={styles.nameAndText}>
            <View>
              <Text style={styles.authorNameText}>{props.author}</Text>
            </View>
            <View>
              <Text style={styles.comment}>{props.item.body}</Text>
            </View>
          </View>
        </View>
      </SwipeItem>
    </View>
  );
};

Comment.propTypes = {
  handleDeleteComment: PropTypes.func,
  handlePutComment: PropTypes.func,
  item: PropTypes.object,
  author: PropTypes.string,
};

export default Comment;
