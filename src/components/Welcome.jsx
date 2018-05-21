
import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ username, handleLogout }) => (
    <div className="jumbotron welcome">
        <h3 className="pull-left"> Welcome, {username}</h3>
        <button className="pull-right btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
);

Welcome.propTypes = {
    username: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default Welcome;
