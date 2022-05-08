import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { clearErrors } from '../actions/errorActions';

class GeneralAlert extends Component {
    state = {
        open: false,
        alertStyle: {
            'borderRadius': '0.5rem',
            'width': 'fit-content',
            'zIndex': '1024',
            'position': 'fixed',
            'bottom': '7%',
            'marginLeft': '7%'
        }
    };

    componentDidUpdate(prevProps) {
        const error = this.props.error;
        if (error !== prevProps.error && error.id === 'ITEM_ERROR' && error.msg) {
            this.open();

            //close the error after 5 seconds
            setTimeout(() => {
                this.close();
            }, 5000);
        }

    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    close = () => {
        this.setState({ open: false })
        this.props.clearErrors()
    }

    open = () => {
        this.setState({ open: true })
    }

    render() {
        return (
            <>
                <CSSTransition in={this.state.open} timeout={500} classNames='generalAlert'>
                    <Alert
                        isOpen={this.state.open}
                        color='danger'
                        toggle={this.close}
                        style={this.state.alertStyle}
                    >
                        {this.props.error.msg.msg}
                    </Alert>
                </CSSTransition>
            </>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error
})

export default connect(mapStateToProps, { clearErrors })(GeneralAlert)