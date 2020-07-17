import React, {useEffect} from 'react';
import axios from "axios";
import {setEmail, setName, setPassword, setToken} from "../../redux/actions";
import { connect } from 'react-redux';
import Login from "./Login";

const LoginContainer = (props) => {
    // useEffect(() => {
    //     localStorage.setItem('author', JSON.stringify(props.state.authorReducer));
    // }, [props.state.authorReducer]);

    const signIn = () => {
        axios.post(`http://trello-purrweb.herokuapp.com/auth/sign-up`,{
            "email": props.state.authorReducer.email,
            "name": props.state.authorReducer.name,
            "password": props.state.authorReducer.password,
        })
            .then(function (response) {
                setToken(response.data.token);
            });
        props.navigation.navigate('MyDesc')
    }

    return (
        <Login signIn={signIn}
               authorReducer={props.state.authorReducer}
               setEmail={(email) => props.setEmail(email)}
               setPassword={(password) => props.setPassword(password)}
               setName={(name) => props.setName(name)}/>
    );
};

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps, { setEmail, setPassword, setToken, setName })(LoginContainer);