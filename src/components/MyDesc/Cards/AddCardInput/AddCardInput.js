import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { addCard } from '../../../../redux/actions';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    borderColor: '#fff',
    marginLeft: 14,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    marginVertical: 15,
  },
});

const AddCardInput = props => {
  const [title, setTitle] = useState('');

  function handleAddAndHide() {
    props.addCardThunk(title, '', false, props.listId, props.state.authorReducer.token);
    setTitle('');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => handleAddAndHide()}>
        <Image style={{ width: 20, height: 20 }} source={require('../../../../img/add.png')} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={text => setTitle(text)}
        value={title}
        placeholder="Add a card..."
        placeholderTextColor="#9C9C9C"
      />
    </View>
  );
};

AddCardInput.propTypes = {
  state: PropTypes.object,
  listId: PropTypes.number,
  addCardThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { addCardThunk: addCard })(AddCardInput);
