import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { removeCardThunk, PutCardThunk, getCardsThunk, getCommentsThunk } from '../../../redux/actions';
import AddCardInput from './AddCardInput/AddCardInput';
import ModalWindow from '../ModalWindow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  card: {
    height: 66,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderBottomColor: '#E5E5E5',
    paddingHorizontal: 10,
  },
  delete: {
    flex: 1,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardTitle: {
    flex: 9,
  },
});

const Cards = props => {
  useEffect(() => {
    props.getCardsThunk(props.state.authorReducer.token);
    props.getCommentsThunk(props.state.authorReducer.token);
  }, []);
  const { listTitle } = props.route.params;
  const { listId } = props.route.params;
  const cards = props.state.cardsReducer.filter(card => card.columnId === listId);
  function handlePutCard(cardId, title) {
    props.PutCardThunk(cardId, title, props.state.authorReducer.token);
  }
  return (
    <View style={styles.container}>
      <AddCardInput listId={listId} />
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <View>
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
              <Image style={{ width: 17, height: 20, marginRight: 5 }} source={require('../../../img/user3x.png')} />
              <Text>{props.state.commentsReducer.filter(comment => comment.cardId === item.id).length} </Text>
              {/* <TouchableOpacity
                style={styles.delete}
                onPress={() => props.removeCardThunk(item.id, props.state.authorReducer.token)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
              <ModalWindow handlePut={handlePutCard} item={item} /> */}
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
  getCommentsThunk: PropTypes.func,
  getCardsThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { removeCardThunk, PutCardThunk, getCardsThunk, getCommentsThunk })(Cards);
