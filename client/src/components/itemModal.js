import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';


class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        };

        //add item via action
        this.props.addItem(newItem);

        //reset variables
        this.setState({
            name: ''
        })

        // close modal
        this.toggle();
    };


    render() {
        return (
            <div>
                <Button
                    color="light"
                    outline
                    style={{ marginBottom: '2rem', border: '2px solid #fff', fontWeight: 'bold' }}
                    onClick={this.toggle}
                >
                    Add Item
                </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>
                        Add to Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='id'
                                    placeholder="Add Shopping item"
                                    onChange={this.onChange}
                                    autoFocus={true}
                                />
                                <Button
                                    color="dark"
                                    block
                                    style={{ marginTop: "1rem" }}>
                                    Add Item
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
    item: state.item
});

export default connect(
    mapStateToProps,
    { addItem }
)(ItemModal);