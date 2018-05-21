import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Welcome from '../components/Welcome';
import Messages from '../components/Messages';
import Send from '../components/Send';

import {
    setIsEmptySend as setIsEmptySendAction,
    setIsConnected as setIsConnectedAction,
    setSocket as setSocketAction,
    setUser as setUserAction,
} from '../actions/RootActions';

import { USER_DISCONNECTED } from '../constants/Events';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const { socket } = this.props;
    }

    handleLogout() {
        const {
            setIsEmptySend,
            setUser,
            setIsConnected,
            socket,
            username,
        } = this.props;

        socket.emit(USER_DISCONNECTED, username);
        setIsEmptySend(true);
        setUser({});
        setIsConnected(false);
    }

    render() {
        const { username, isConnected, msgs } = this.props;

        if (!isConnected) {
            return <Redirect to="/" />;
        }

        return (
            <div className="fluid-container chat">
                <Welcome username={username} handleLogout={this.handleLogout} />
                <Messages msgs={msgs} />
                <Send />
            </div>
        );
    }
}

Chat.propTypes = {
    username: PropTypes.string.isRequired,
    msgs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        senderName: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        receivedAt: PropTypes.string.isRequired,
    })).isRequired,
    isConnected: PropTypes.bool.isRequired,
    setIsEmptySend: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setIsConnected: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    isConnected: state.isConnected,
    socket: state.socket,
    msgs: state.msgs,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setIsEmptySend: setIsEmptySendAction,
    setIsConnected: setIsConnectedAction,
    setSocket: setSocketAction,
    setUser: setUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
