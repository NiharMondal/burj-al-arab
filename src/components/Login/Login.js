import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import * as firebase from 'firebase/app'
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

    const handleGoogleSignIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {

            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            console.log(signedInUser)
            setLoggedInUser(signedInUser)
            history.replace(from)
            // ...
        }).catch(function (error) {
            // Handle Errors here.

            var errorMessage = error.message;
            console.log(errorMessage)
        });
        
    }

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <div>
            <h1>This is Login</h1>
            <Button onClick={handleGoogleSignIn}>Goggle Sign-In</Button>
        </div>
    );
};

export default Login;