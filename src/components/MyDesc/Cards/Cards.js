import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {getCards} from "../../../redux/actions";
import { View, TouchableOpacity } from 'react-native-web';
import { Text, FlatList, StyleSheet } from 'react-native';
import AddCardInput from './AddCardInput/AddCardInput';

class Cards extends React.Component {

    // componentDidMount() {
    //     axios.get(`http://trello-purrweb.herokuapp.com/cards`,
    //     { headers: {"Authorization" : 'Bearer bdaa158a4b624d0bca108a027905a7c0d2f5bd6074806ec0bf5cb76ea4f2b7fd'} })
    //     .then(response => {
    //         this.props.getCards(response.data);
    //     });
    // }
    listTitle = this.props.route.params;
    renderItem = ({ item }) => (
            <TouchableOpacity style={styles.button} onPress={()=>console.log('1')}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
    );

    render() {
        return (
          <View >
                <AddCardInput listTitle={this.listTitle}/>
                <FlatList
                    data={this.props.state.cardsReducer}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
          </View>
        )
    }
}

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
    add: {
    }
});

const mapStateToProps = state => ({
    state,
});
export default connect(mapStateToProps, {getCards})(Cards);