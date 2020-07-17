import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {getCards, removeCard} from "../../../redux/actions";
import { View, TouchableOpacity } from 'react-native-web';
import { Text, FlatList, StyleSheet } from 'react-native';
import AddCardInput from './AddCardInput/AddCardInput';

const Cards = props => {

    // componentDidMount() {
    //     axios.get(`http://trello-purrweb.herokuapp.com/cards`,
    //     { headers: {"Authorization" : 'Bearer bdaa158a4b624d0bca108a027905a7c0d2f5bd6074806ec0bf5cb76ea4f2b7fd'} })
    //     .then(response => {
    //         this.props.getCards(response.data);
    //     });
    // }
    const listTitle = props.route.params;
    const cards = props.state.cardsReducer.filter(card => card.columnId === props.route.params);

        return (
          <View style={styles.container}>
                <AddCardInput listTitle={listTitle}/>
                <FlatList
                    data={cards}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={()=>console.log('1')}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <TouchableOpacity style={styles.delete} onPress={()=> props.removeCard(item.id)}>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
          </View>
        )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
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
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    delete: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#AC5253",
        height: 50,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    cardTitle: {
        flex: 9,
    },
});

const mapStateToProps = state => ({
    state,
});
export default connect(mapStateToProps, {getCards, removeCard})(Cards);