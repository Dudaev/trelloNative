import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Text, TextInput, TouchableOpacity, View} from "react-native-web";
import {addComment, addDescription} from "../../../../redux/actions";
// import Comment from './Comment/Comment.jsx';
// import Description from './Description/Description.jsx';
// import CardHeader from './CardHeader/CardHeader.jsx';
// import { handleAddComment } from '../../../../../redux/actions';

function CardDetailWindow(props) {
    const [comment, setComment] = useState('');
    const [description, setDescription] = useState('');

    const { listTitle } = props.route.params;
    const { cardTitle } = props.route.params;
    const { cardDescription } = props.route.params;
    const { author } = props.route.params;
    const { cardId } = props.route.params;

    const generateId = () => {
        let id = 0;
        let result = true;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            for (let i = 0; i < props.comments.length; i += 1) {
                if (id === props.comments[i].id) {
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

    function addDescription() {
        props.addDescription(description, cardId);
        setDescription('');
    }
    function addComment() {
        props.addComment({
            id: generateId(),
            authorId: 0,
            cardId: props.cardId,
            body: comment,
         });
        setDescription('');
    }

    // const commentsList = props.thisCardComments.map(comments => (
    //     <Comment key={comments.id} id={comments.id} body={comments.body} author={props.author} />
    // ));

    return (
        <View>

            <View>
                <Text>CardHeader: {cardTitle}</Text>
            </View>

            <View>
                <Text>in list: {listTitle}</Text>
            </View>

            <View>
                <Text>Author: {author}</Text>
            </View>

            <View>
                <Text>Descriptiont: {cardDescription}</Text>
            </View>
            {/*<Description cardId={props.cardId} nameList={props.nameList} cardDescription={props.cardDescription} />*/}

            <TextInput
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <TouchableOpacity onPress={addDescription}>
                <Text>Save description</Text>
            </TouchableOpacity>

            {/*<div>Activity</div>*/}
            {/*<InputGroup>*/}
            {/*    <FormControl*/}
            {/*        value={comment}*/}
            {/*        onChange={e => setComment(e.target.value)}*/}
            {/*        as="textarea"*/}
            {/*        aria-label="With textarea"*/}
            {/*    />*/}
            {/*</InputGroup>            */}

            {/*<Button*/}
            {/*    onClick={() => {*/}
            {/*        props.handleAddComment({*/}
            {/*            id: generateId(),*/}
            {/*            authorId: 0,*/}
            {/*            cardId: props.cardId,*/}
            {/*            body: comment,*/}
            {/*        });*/}
            {/*        setComment('');*/}
            {/*    }}*/}
            {/*    variant="primary"*/}
            {/*>*/}
            {/*    Save*/}
            {/*</Button>*/}

            {/*<TextInput*/}
            {/*    onChangeText={text => setComment(text)}*/}
            {/*    value={comment}*/}
            {/*/>*/}

            {/*<TouchableOpacity onPress={addComment}>*/}
            {/*    <Text>Save description</Text>*/}
            {/*</TouchableOpacity>*/}

            <Text>Форма добавления комментариев</Text>

            {/*{commentsList}*/}

            <Text>Список комментариев</Text>

        </View>
    );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
    addDescription, addComment
})(CardDetailWindow);