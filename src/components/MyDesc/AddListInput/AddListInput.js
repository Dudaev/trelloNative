import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {TouchableOpacity, TextInput, Text, StyleSheet} from "react-native-web";
import { addList, removeList } from '../../../redux/actions';
import { View } from 'react-native';
import {connect} from "react-redux";



const AddListInput = props => {
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const author = useSelector(state => state.authorReducer);
  const generateId = () => {
    let id = 0;
    let result = true;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (let i = 0; i < props.state.columnsReducer.length; i += 1) {
        if (id === props.state.columnsReducer[i].id) {
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

    props.addList({
        id: generateId(),
        title: title,
      });
    setTitle('');
  }
  return (
    <View>

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
        {/* )} */}


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
export default connect(mapStateToProps, {addList})(AddListInput);