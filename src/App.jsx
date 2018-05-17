import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import { LOGOUT, USER_CONNECTED } from './constants/Events';
import { setSocket, setUser } from './actions/RootActions';

const socketURL = 'http://localhost:33500';

class App extends Component {
    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
    }

    componentWillMount() {
        this.initSocket();
    }

    setUser(user) {
        const { socket, setUser } = this.props;
        socket.emit(USER_CONNECTED, user);
        setUser(user);
    }

    initSocket() {
        const socket = io(socketURL);
        socket.on('connect', () => {
            console.log('Connected');
        });

        const { setSocket } = this.props;
        setSocket(socket);
    }

    logOut() {
        const { socket, setUser } = this.props;
        socket.emit(LOGOUT);
        setUser(null);
    }

    render() {
        const { socket } = this.props;
        return (
            <div>HELLO</div>
        );
    }
}

App.propTypes = {
    socket: PropTypes.func.isRequired,
    setSocket: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ socket: state.socket });
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ setSocket, setUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);