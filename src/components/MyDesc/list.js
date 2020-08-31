import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SwipeItem, SwipeButtonsContainer } from 'react-native-swipe-item';
import { removeListThunk, setColumns, getListsThunk, PutListThunk } from '../../redux/actions';
import ModalWindow from './ModalWindow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  list: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // marginTop: 15,
  },
  containerListTitle: {
    flex: 5,
    height: 59,
    justifyContent: 'center',
  },
  listTitle: {
    fontSize: 17,
    color: '#514D47',
    paddingHorizontal: 15,
  },
  swipeButton: {
    height: 59,
    alignSelf: 'center',
    marginTop: 15,
  },
  swipeContentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
});

const List = props => {
  const leftButton = (
    <SwipeButtonsContainer
      style={{
        alignSelf: 'center',
        aspectRatio: 1,
        flexDirection: 'column',
        padding: 10,
      }}
    >
      <ModalWindow style={styles.delete} handlePut={props.handlePutList} item={props.item} />
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
      <TouchableOpacity onPress={() => props.removeListThunk(props.item.id, props.token)}>
        <Text>Remove !</Text>
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
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            props.navigation.navigate('Cards', {
              listId: props.item.id,
              listTitle: props.item.title,
            });
          }}
        >
          <View style={styles.containerListTitle}>
            <Text style={styles.listTitle}>{props.item.title}</Text>
          </View>

          {/* <TouchableOpacity
          style={styles.button}
          onPress={() => props.removeListThunk(item.id, props.state.authorReducer.token)}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
        <ModalWindow style={styles.delete} handlePut={handlePutList} item={item} /> */}
        </TouchableOpacity>
      </SwipeItem>
    </View>
  );
};

List.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};

export default List;
