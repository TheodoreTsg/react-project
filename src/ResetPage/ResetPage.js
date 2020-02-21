import React from 'react';
import './ResetPage.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { userService } from '../_services/user.service';
import {validateUser} from '../PrivateRoute/PrivateRoute';

const schema = Yup.object({
    email: Yup.string().email('Ivalid email!').required('Email is required!'),
  });

class ResetPage extends React.Component {
    constructor(props) {
        super(props);

        if(validateUser()) {
            this.props.history.push('/');
        } else {
            userService.logout();
        }

        this.state = {
            email: '',
            submitted: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    redirectToLogin = () => {
        this.props.history.push('/login');
    }

    handleChange(event) {
        console.log('Handlechange');
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const resetPasswordEmail = {
            email: event.email
        }
        userService.forgotPassword(resetPasswordEmail)
        .then(response => {
            if (response === 'false') {
                this.setState({error: 'The Email doesn\'t exist!'});
            } else {
                console.log('Response is ', response);
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
                                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
                                        <h1 className="display-4 py-2 text-truncate">BattleNet</h1>
                                        <h4 className="text-center">Reset Your Password</h4>
                                        <p>Enter your e-mail address and we'll send you a link to reset your password.</p>
                                        <div className="px-2">
                                            <Form noValidate onSubmit={handleSubmit} action="" >
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="validationFormik01">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="E-mail address"
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.email}
                                                            />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.email}
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
                                                <button type="submit" className="button1">Submit</button>
                                                <button type="button" className="button1" onClick={this.redirectToLogin}><i className="pi pi-arrow-circle-left"></i>Back</button>
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

export  {ResetPage};