import React, { Component } from 'react';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <>
                <NavLink onClick={this.props.logout} href='#'>
                    Logout
                </NavLink>
            </>
        )
    }
}

export default connect(null, { logout })(Logout);

