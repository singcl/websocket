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
    postMsg as postMsgAction,
    setTypingValue as setTypingValueAction,
} from '../actions/RootActions';

import { USER_DISCONNECTED, OTHER_DISCONNECTED, OTHER_SENT, SELF_SENT } from '../constants/Events';
import { LEFT, OTHER_INFO, SELF_INFO } from '../constants/Msgs';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleOtherLogout = this.handleOtherLogout.bind(this);
        this.handleOtherSent = this.handleOtherSent.bind(this);
        this.handleChangeSend = this.handleChangeSend.bind(this);
        this.handleSent = this.handleSent.bind(this);
    }

    componentDidMount() {
        const { socket } = this.props;
        socket.on(OTHER_DISCONNECTED, this.handleOtherLogout);
        socket.on(OTHER_SENT, this.handleOtherSent);
    }

    componentWillUnmount() {
        const { socket } = this.props;
        socket.off(OTHER_DISCONNECTED, this.handleOtherLogout);
        socket.off(OTHER_SENT, this.handleOtherSent);
    }

    handleChangeSend(e) {
        const { setIsEmptySend, setTypingValue } = this.props;
        setTypingValue(e.target.value);
        if (e.target.value === '') {
            setIsEmptySend(true);
        } else {
            setIsEmptySend(false);
        }
    }

    handleSent(e, input) {
        e.preventDefault();
        console.log(input);
        const {
            socket,
            username,
            postMsg,
            setIsEmptySend,
            setTypingValue,
        } = this.props;
        postMsg({
            senderName: username,
            content: input.value,
            color: SELF_INFO.color,
        });
        socket.emit(SELF_SENT, username, input.value);
        setIsEmptySend(true);
        setTypingValue('');
    }

    handleOtherLogout(otherUsername) {
        const { postMsg } = this.props;
        postMsg({
            senderName: otherUsername,
            content: LEFT.content,
            color: LEFT.color,
        });
    }

    handleOtherSent(otherUsername, content) {
        console.log(this);
        const { postMsg } = this.props;
        postMsg({
            senderName: otherUsername,
            content,
            color: OTHER_INFO.color,
        });
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
        const {
            username,
            isConnected,
            msgs,
            isEmptySend,
            typingValue,
        } = this.props;

        if (!isConnected) {
            return <Redirect to="/" />;
        }

        return (
            <div className="fluid-container chat">
                <Welcome username={username} handleLogout={this.handleLogout} />
                <Messages msgs={msgs} />
                <Send
                    isDisabledSend={isEmptySend}
                    handleChangeSend={this.handleChangeSend}
                    handleSent={this.handleSent}
                    typingValue={typingValue}
                />
            </div>
        );
    }
}

Chat.propTypes = {
    socket: PropTypes.shape().isRequired,
    username: PropTypes.string.isRequired,
    typingValue: PropTypes.string.isRequired,
    isEmptySend: PropTypes.bool.isRequired,
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
    postMsg: PropTypes.func.isRequired,
    setTypingValue: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
    isConnected: state.isConnected,
    socket: state.socket,
    msgs: state.msgs,
    typingValue: state.typingValue,
    isEmptySend: state.isEmptySend,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setIsEmptySend: setIsEmptySendAction,
    setIsConnected: setIsConnectedAction,
    setSocket: setSocketAction,
    setUser: setUserAction,
    postMsg: postMsgAction,
    setTypingValue: setTypingValueAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
