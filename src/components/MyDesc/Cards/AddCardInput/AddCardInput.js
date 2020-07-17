import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import {View, TouchableOpacity, TextInput, Text, StyleSheet} from "react-native-web";
import { addCard, removeCard } from '../../../../redux/actions';

const AddCardInput = props => {
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const author = props.state.authorReducer.name;

  const generateId = () => {
    let id = 0;
    let result = true;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (let i = 0; i < props.state.cardsReducer.length; i += 1) {
        if (id === props.state.cardsReducer[i].id) {
          result = false;
          break;
        } else {
          result = true;
        }
      }
      if (result === true) {
        break;
      }
      id += 1;
    }
    return id;
  };
  function handleAddAndHide() {
    setVisible(false);

    props.addCard({
        id: generateId(),
        title: title,
        authorName: author,
        columnId: props.listId ,
        description: '',
        checked: false,
      });
    setTitle('');
  }
  return (
    <View>
          <TextInput
              style={styles.input}
            onChangeText={text => setTitle(text)}
            value={title}
          />
          <TouchableOpacity style={styles.add} onPress={handleAddAndHide}>
            <Text>Add card</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10,
      backgroundColor: "#FFFFFF",
  },
  title:{
      flex: 1,
      borderBottomWidth: 1,
      borderColor: "#E5E5E5",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
  },
  body:{
      flex: 9,

  },
  button: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: 10,
      borderWidth: 1,
      borderColor: "#E5E5E5",
  },
  text: {
      flex: 1
  },
    input: {
      borderWidth: 1
  }
});

const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, {addCard, removeCard})(AddCardInput);