import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeListThunk, setColumns, getListsThunk, PutListThunk } from '../../redux/actions';
import ModalWindow from './ModalWindow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: 15,
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
});

const MyDesk = props => {
  useEffect(() => {
    props.getListsThunk(props.state.authorReducer.token);
  }, []);

  function handlePutList(listId, title) {
    props.PutListThunk(listId, title, props.state.authorReducer.token);
  }

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.list}
        onPress={() =>
          props.navigation.navigate('Cards', {
            listId: item.id,
            listTitle: item.title,
          })
        }
      >
        <View style={styles.containerListTitle}>
          <Text style={styles.listTitle}>{item.title}</Text>
        </View>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => props.removeListThunk(item.id, props.state.authorReducer.token)}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
        <ModalWindow style={styles.delete} handlePut={handlePutList} item={item} /> */}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList data={props.state.columnsReducer} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    </View>
  );
};

MyDesk.propTypes = {
  state: PropTypes.object,
  item: PropTypes.object,
  navigation: PropTypes.object,
  getColumns: PropTypes.func,
  removeListThunk: PropTypes.func,
  getListsThunk: PropTypes.func,
  PutListThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { setColumns, removeListThunk, getListsThunk, PutListThunk })(MyDesk);
