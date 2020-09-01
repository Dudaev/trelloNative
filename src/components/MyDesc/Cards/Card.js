import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import ModalWindow from '../ModalWindow';

const styles = StyleSheet.create({
  cardContainer: {
    height: 66,
    backgroundColor: '#fff',
  },
  card: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  cardTitle: {
    flex: 9,
  },
  containerListTitle: {
    backgroundColor: '#fff',
  },
});

const Card = props => {
  const leftButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <ModalWindow handlePut={props.handlePutCard} item={props.item} />
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
      <TouchableOpacity style={styles.delete} onPress={() => props.removeCardThunk(props.item.id, props.token)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </SwipeButtonsContainer>
  );
  return (
    <View style={styles.cardContainer}>
      <SwipeItem
        style={styles.swipeButton}
        swipeContainerStyle={styles.swipeContentContainerStyle}
        leftButtons={leftButton}
        rightButtons={rightButtons}
      >
        <View style={styles.containerListTitle}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              props.navigation.navigate('CardDetailWindow', {
                listTitle: props.listTitle,
                cardId: props.item.id,
                cardTitle: props.item.title,
                cardDescription: props.item.description,
                author: props.state.authorReducer.name,
              });
            }}
          >
            <Text style={styles.cardTitle}>{props.item.title}</Text>
            <Image style={{ width: 17, height: 20, marginRight: 5 }} source={require('../../../img/user3x.png')} />
            <Text>{props.state.commentsReducer.filter(comment => comment.cardId === props.item.id).length} </Text>
          </TouchableOpacity>
        </View>
      </SwipeItem>
    </View>
  );
};

Card.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
  state: PropTypes.object,
  listTitle: PropTypes.string,
  token: PropTypes.string,
  removeCardThunk: PropTypes.func,
  handlePutCard: PropTypes.func,
};

export default Card;
