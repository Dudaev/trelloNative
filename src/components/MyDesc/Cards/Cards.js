import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { removeCardThunk, PutCardThunk, getCardsThunk, getCommentsThunk } from '../../../redux/actions';
import AddCardInput from './AddCardInput/AddCardInput';
import ModalWindow from '../ModalWindow';

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
              <Text>COM {props.state.commentsReducer.filter(comment => comment.cardId === item.id).length} </Text>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => props.removeCardThunk(item.id, props.state.authorReducer.token)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
              <ModalWindow handlePut={handlePutCard} item={item} />
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
