import React from 'react';
import Col from 'react-bootstrap/Col';
import './SignUpPage.css'
import {Formik, connect} from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import { userService } from '../_services/user.service';
import spinner from '../LoginPage/loading.gif';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const schema = Yup.object({
    username: Yup.string().required('Username is required!'),
    email: Yup.string().email('Ivalid email').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
    confirmpassword: Yup.string().required('Confirm Password is required!')
  });

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            loading: false,
            hiddenPass: true,
            hiddenConfPass: true,
            error: '',
            info: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleShowPass = this.toggleShowPass.bind(this);
        this.toggleShowConfPass = this.toggleShowConfPass.bind(this);
    }

    //used as hook function
    redirectToLogin = () => {
        this.props.history.push('/login');
    }

    toggleShowPass() {
        this.setState({ hiddenPass: !this.state.hiddenPass });
    }

    toggleShowConfPass() {
        this.setState({ hiddenConfPass: !this.state.hiddenConfPass });
    }

    handleChange(event) {
        console.log('Event is ', event.target.value);
        this.setState({username: event.target.username});
    }

    handleSubmit(event) {
        this.setState({ loading: true });

        const signUpValues = {
            username: event.username,
            email: event.email,
            password: event.password,
            confirmpass: event.confirmpassword
        }
        const {username,password} = this.state;
        console.log('Username is ', username , ' and password is ', password);
        console.log('This state is ', this.state);
        if(signUpValues.password !== signUpValues.confirmpass) {
            this.setState({error: 'Passwords don\'t match'});
            this.setState({loading: false});
        } else {
            this.setState({error: ''});
            userService.signUpForm(signUpValues)
            .then(response => {
                if (response === 'User already exists!') {
                    this.setState({error: response})
                } else {
                    this.setState({username: ''});
                    this.setState({info: response});
                    setTimeout(() => {
                        window.location.replace('/login');
                    }, (4000));
                }
                this.setState({loading: false});
            });
        }
    }

    render() {
        return (
            <div className="contain">
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleSubmit}
                    initialValues={this.state}
                    values={this.state}
                    onChange={this.handleChange}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    props
                }) => (
                    <section id="cover" className="min-vh-100">
                        <div id="cover-caption">
                            <div className="container">
                                <div className="row text-white">
                                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4">
                                        <h1 className="display-4 py-2 text-truncate">BattleNet</h1>
                                        <h3 className="text-center">Register Form</h3>
                                        <div className="px-2">
                                            <Form noValidate onSubmit={handleSubmit}>
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
                                                                type="text"
                                                                placeholder="Email"
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                isInvalid={touched.email && errors.email}
                                                            />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                <Form.Group as={Col} controlId="validationFormik03">
                                                    <InputGroup >
                                                            <Form.Control
                                                                type={this.state.hiddenPass ? "password" : "text"}
                                                                placeholder="New Password"
                                                                name="password"
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                isInvalid={touched.password && errors.password}
                                                            />
                                                        <InputGroup.Append>
                                                            <Button className="showPassword" type="button" variant="dark" onClick={this.toggleShowPass}>
                                                                <i className={this.state.hiddenPass ? "pi pi-eye" : "pi pi-eye-slash"} aria-hidden="true"></i>
                                                            </Button>
                                                        </InputGroup.Append>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.password}
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="validationFormik04">
                                                        <InputGroup>
                                                            <Form.Control
                                                                type={this.state.hiddenConfPass ? "password" : "text"}
                                                                placeholder="Confirm Password"
                                                                name="confirmpassword"
                                                                value={values.confirmpassword}
                                                                onChange={handleChange}
                                                                isInvalid={touched.confirmpassword && errors.confirmpassword}
                                                            />
                                                            <InputGroup.Append>
                                                                <Button className="showPassword" type="button" variant="dark" onClick={this.toggleShowConfPass}>
                                                                    <i className={this.state.hiddenConfPass ? "pi pi-eye" : "pi pi-eye-slash"} aria-hidden="true"></i>
                                                                </Button>
                                                            </InputGroup.Append>
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.confirmpassword}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form.Row>
                                                {
                                                    this.state.error !== '' &&
                                                    <div className={'alert alert-danger'}>{this.state.error}</div>
                                                }
                                                {
                                                    this.state.info !== '' &&
                                                    <div className={'alert alert-success'}>{this.state.info}</div>
                                                }
                                                <button type="submit" className="button1" disabled={this.state.loading}>Submit</button>
                                                <button type="button" className="button1" onClick={this.redirectToLogin}><i className="pi pi-arrow-circle-left"></i>Back</button>
                                                {
                                                    this.state.loading &&
                                                    <img alt="" className="loading" src={spinner} />
                                                }
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

export  {SignUpPage};

class ShowPassword extends React.Component {
    constructor(props) {
        super(props);
        console.log('Props are ', this.props);
        this.state = {
            active: false,
            type: 'password',
        };
        this.toggleButton = this.toggleButton.bind(this);
    }
    toggleButton() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
        if(currentState) {
            this.setState({type: 'password'});
        } else {
            this.setState({type: 'text'})
        }
    }

    render() {
        return(
            <Form.Row>
                <Form.Group as={Col} controlId="validationFormik05">
                    <InputGroup >
                        <Form.Control
                            type={this.state.type}
                            placeholder="Confirm Password"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            isInvalid={this.props.formik && this.props.formik.touched.confirmpassword && this.props.formik.errors.confirmpassword}
                        />
                        <InputGroup.Append>
                            <button className="showPassword" onClick={this.toggleButton} type="button" variant="outline-secondary">
                                <i className={this.state.active ? 'pi pi-eye' : 'pi pi-eye-slash'} aria-hidden="true"></i>
                            </button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {this.props.formik && this.props.formik.errors.confirmpassword}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        )
    }
}

export default connect(ShowPassword)