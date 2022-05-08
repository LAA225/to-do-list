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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const error = this.props.error
        // if there is a new error
        if (error !== prevProps.error) {
            //check if register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            }
            else {
                this.setState({ msg: null })
            }
        }

        // if authenticated close the modal
        if (this.state.modal && this.props.isAuthenticated) {
            this.toggle();
        }
    }

    toggle = () => {
        //clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        })

        // reset variables
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
        const { name, email, password } = this.state;
        this.props.register(name, email, password)

    };


    render() {
        return (
            <div>
                <NavLink
                    color='dark'
                    onClick={this.toggle}
                > Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder="name"
                                    className='mb-3'
                                    onChange={this.onChange}
                                    autoFocus={true}
                                />
                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder="email"
                                    className='mb-3'
                                    onChange={this.onChange}
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
                                    Register
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);