import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import { PropTypes } from 'prop-types';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id, clicked) => {
        //disable button so it cannot be clicked again during the animation
        if (!clicked) this.props.deleteItem(id);
        clicked = 'true';

    }

    buttonStyle = {
        marginRight: '0.75rem',
        paddingRight: '0.6rem',
        paddingLeft: '0.6rem',
        border: '1px solid #dc3545'
    }

    render() {
        const { items } = this.props.item;
        var clicked = false;
        return (
            <Container className='mb-5'>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {
                            items.map(({ _id, name }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fades" >
                                    <ListGroupItem color='dark' style={{ 'background-color': 'transparent', fontWeight: 'bold', borderColor: 'transparent' }}>
                                        <Button
                                            color="danger"
                                            outline
                                            className="delete"
                                            size="sm"
                                            style={this.buttonStyle}
                                            onClick={this.onDeleteClick.bind(this, _id, clicked)}>
                                            &times;
                                        </Button>
                                        {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container >
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(ShoppingList);