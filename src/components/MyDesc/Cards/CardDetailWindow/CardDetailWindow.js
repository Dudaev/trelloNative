import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Text, View} from "react-native-web";
// import Comment from './Comment/Comment.jsx';
// import Description from './Description/Description.jsx';
// import CardHeader from './CardHeader/CardHeader.jsx';
// import { handleAddComment } from '../../../../../redux/actions';

function CardDetailWindow(props) {
    const [comment, setComment] = useState('');

    const { listTitle } = props.route.params;
    const { cardTitle } = props.route.params;
    const { cardDescription } = props.route.params;
    const { author } = props.route.params;

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

    // const commentsList = props.thisCardComments.map(comments => (
    //     <Comment key={comments.id} id={comments.id} body={comments.body} author={props.author} />
    // ));

    return (
        <View>

            {/*<CardHeader title={props.cardName} cardId={props.cardId} />*/}
            <View>
                <Text>CardHeader: {cardTitle}</Text>
            </View>

            {/*<div>*/}
            {/*    <b>in list</b> {props.nameList}*/}
            {/*</div>*/}

            <View>
                <Text>in list: {listTitle}</Text>
            </View>
            {/*<div>*/}
            {/*    <b>Author</b> {props.author}*/}
            {/*</div>*/}
            <View>
                <Text>Author: {author}</Text>
            </View>

            <View>
                <Text>Descriptiont: {cardDescription}</Text>
            </View>
            {/*<Description cardId={props.cardId} nameList={props.nameList} cardDescription={props.cardDescription} />*/}

            <Text>Форма обновления описания</Text>

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

            <Text>Форма добавления комментариев</Text>

            {/*{commentsList}*/}

            <Text>Список комментариев</Text>

        </View>
    );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
    // handleAddComment
})(CardDetailWindow);