import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Welcome from '../components/Welcome';
import Messages from '../components/Messages';
import Send from '../components/Send';

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { socket } = this.props;
    }

    render() {
        const { isConnected } = this.props;

        if (!isConnected) {
            return <Redirect to="/" />;
        }

        return (
            <div className="fluid-container chat">
                <Welcome />
                <Messages />
                <Send />
            </div>
        );
    }
}

Chat.propTypes = {
    isConnected: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
    isConnected: state.isConnected,
});

export default connect(mapStateToProps)(Chat);
