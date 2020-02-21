import React from 'react';
import './LoginPage.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import {Formik} from 'formik';
import * as Yup from 'yup';
import spinner from "./loading.gif";
import { userService } from '../_services/user.service';
import {validateUser} from '../PrivateRoute/PrivateRoute';
// import { useHistory } from "react-router-dom";

const schema = Yup.object({
    username: Yup.string().required('Username is required!'),
    password: Yup.string().min(3,'Too short!').max(50,'Too long!').required('Password is required!'),
  });

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        if(validateUser()) {
            this.props.history.push('/');
        } else {
            userService.logout();
        }

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
    }
    //u need to bind this in constructor
    signup() {
        this.props.history.push('/signup');
    }

    handleChange(event) {
        console.log('Handlechange');
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.setState({ submitted: true });
        this.setState({ loading: true });

        const loginCredentials = {
            username: event.username,
            password: event.password
        }

        userService.login(loginCredentials)
        .then(response => {
            if (response === 'false') {
                this.setState({error: 'Wrong Username or Password'});
                this.setState({loading: false});
            } else {
                localStorage.setItem('jwt-token', response);
                this.setState({error: ''});
                const { from } = this.props.location.state || { from: { pathname: "/"}};
                this.props.history.push(from);
            }
        });
    }

    render() {
        return (
            <div className="contain">
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleSubmit}
                    initialValues={this.state}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <section id="cover" className="min-vh-100">
                        <div id="cover-caption">
                            <div className="container">
                                <div className="row text-white">
                                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto  form p-4">
                                        <h1 className="display-4 py-2 text-truncate">BattleNet</h1>
                                        <div className="px-2">
                                            <Form noValidate onSubmit={handleSubmit} action="" >
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="validationFormik01">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Username"
                                                                name="username"
                                                                value={values.username}
                                                                onChange={handleChange}
                                                                isInvalid={touched.username && errors.username}
                                                            />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.username}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                <Form.Group as={Col} controlId="validationFormik02">
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="Password"
                                                                name="password"
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                isInvalid={touched.password && errors.password}
                                                            />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.password}
                                                    </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col}>
                                                        {
                                                            this.state.error !== '' &&
                                                            <div className={'alert alert-danger'}>{this.state.error}</div>
                                                        }
                                                    </Form.Group>
                                                </Form.Row>
                                                <button type="submit" className="button1" disabled={this.state.loading}>Login</button>
                                                <button type="button" className="button1" onClick= {this.signup}>Sign Up</button>
                                                {
                                                    this.state.loading &&
                                                    <img alt="" className="loading" src={spinner} />
                                                }
                                                <a href="/reset" className="forgotPass">Forgot Password?</a>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                </Formik>
            </div>
        );
    }
}

export {LoginPage};