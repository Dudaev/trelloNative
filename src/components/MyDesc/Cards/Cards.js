import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { removeCardThunk, PutCardThunk, getCardsThunk, getCommentsThunk } from '../../../redux/actions';
import AddCardInput from './AddCardInput/AddCardInput';
import Card from './Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  card: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
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
  const cards = props.state.cardsReducer.cards.filter(card => card.columnId === listId);
  function handlePutCard(cardId, title) {
    props.PutCardThunk(cardId, title, props.state.authorReducer.token);
  }
  return (
    <View style={styles.container}>
      <AddCardInput listId={listId} />
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <Card
            listTitle={listTitle}
            item={item}
            navigation={props.navigation}
            removeCardThunk={props.removeCardThunk}
            state={props.state}
            token={props.state.authorReducer.token}
            handlePutCard={handlePutCard}
          />
        )}
        keyExtractor={item => item.id.toString()}
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
