import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: ''
    };

    componentDidUpdate(prevProps) {
        const error = this.props.error

        //checking if new error to display
        if (error !== prevProps.error) {
            //check if login error otherwise donot display
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            }
            else {
                this.setState({ msg: null });
            }
        }

        //if authenticated then close modal
        if (this.state.modal && this.props.isAuthenticated) {
            this.toggle();
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    toggle = () => {
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        })

        // if variables not reset, then user has data stored even with empty fields
        this.setState({
            name: '',
            email: '',
            password: ''
        })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        console.log('pressed button')

        //call action to register user
        const { email, password } = this.state;
        this.props.login(email, password)
    };


    render() {
        return (
            <div>
                <NavLink
                    color='dark'
                    onClick={this.toggle}
                > Login
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>
                        Login
                    </ModalHeader>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder="email"
                                    className='mb-3'
                                    onChange={this.onChange}
                                    autoFocus
                                />
                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder="password"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    block
                                    style={{ marginTop: "1rem" }}>
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        );
    };
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);