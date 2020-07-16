import React, {useEffect} from 'react';
import axios from "axios";
import {SetEmail, SetName, SetPassword, SetToken} from "../../redux/actions";
import { connect } from 'react-redux';
import Login from "./Login";

const LoginContainer = (props) => {
    useEffect(() => {
        localStorage.setItem('author', JSON.stringify(props.state.authorReducer));
    }, [props.state.authorReducer]);

    const signIn = () => {
        axios.post(`http://trello-purrweb.herokuapp.com/auth/sign-up`,{
            "email": props.state.authorReducer.email,
            "name": props.state.authorReducer.name,
            "password": props.state.authorReducer.password,
        })
            .then(function (response) {
                SetToken(response.data.token);
            });
        props.navigation.navigate('MyDesc')
    }

    return (
        <Login signIn={signIn}
               authorReducer={props.state.authorReducer}
               SetEmail={(email) => dispatch(SetEmail(email))}
               SetPassword={(password) => dispatch(SetPassword(password))}
               SetName={(name) => dispatch(SetName(name))}/>
    );
};

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps, { SetEmail, SetPassword, SetToken, SetName })(LoginContainer);