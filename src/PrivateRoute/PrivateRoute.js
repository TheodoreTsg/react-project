import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        validateUser()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export function validateUser() {
    const token = localStorage.getItem('jwt-token');
    if( token ) {
        var decode = jwt_decode(localStorage.getItem('jwt-token'));
        if(Date.now() >= decode.exp * 1000) {
            console.log('Token is expired');
            return false;
        } else {
            return true;
        }
    }
}