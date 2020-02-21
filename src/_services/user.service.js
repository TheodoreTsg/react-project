import jwt_decode from 'jwt-decode';

export const userService = {
    login,
    logout,
    getUsernameFromToken,
    signUpForm,
    forgotPassword
};

function login(loginCredentials) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(loginCredentials)
    };

    return fetch('http://localhost:8090/login', requestOptions)
    .then(handleResponse)
    .then(response => {
        return response;
    })
}

function logout() {
    localStorage.removeItem('jwt-token');
}

function getUsernameFromToken() {
    const token = localStorage.getItem('jwt-token');
        if( token ) {
            var decode = jwt_decode(localStorage.getItem('jwt-token'));
            return decode.username
        } else {
            return '';
        }
}

function signUpForm(signUpValues) {
    console.log('Values are', signUpValues);
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(signUpValues)
    };

    return fetch('http://localhost:8090/signup', requestOptions)
    .then(handleResponse)
    .then(response => {
        console.log(response);
        return response;
    })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function forgotPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(email)
    };

    return fetch('http://localhost:8090/forgot-password', requestOptions)
    .then(handleResponse)
    .then(response => {
        console.log(response);
        return response;
    })
}