import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';

import { VERIFY_USER } from '../constants/Events';
import { createUser } from '../Factory';
import LoginError from '../constants/LoginError';

import {
    setIsConnected as setIsConnectedAction,
    setLoginError as setLoginErrorAction,
} from '../actions/RootActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.verify = this.verify.bind(this);
    }

    verify({ isValid, kind }) {
        const { setLoginError } = this.props;
        if (isValid) {
            setLoginError('');
        } else {
            switch (kind) {
            case LoginError.EMPTY:
                setLoginError(LoginError.EMPTY_INFO);
                break;
            case LoginError.EXISTED:
                setLoginError(LoginError.EXISTED_INFO);
                break;
            default:
                setLoginError(kind);
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { socket } = this.props;
        socket.emit(VERIFY_USER, this.textInput.value, ({ isValid, kind }) => {
            this.verify({ isValid, kind });
            if (isValid) {
                const name = this.textInput.value;
                const { setUser, setIsConnected } = this.props;
                setUser(createUser({ name }));
                setIsConnected(true);
            }
        });
    }

    handleChange(e) {
        e.preventDefault();
        const { socket } = this.props;
        socket.emit(VERIFY_USER, this.textInput.value, this.verify);
    }

    render() {
        const { isConnected, user, loginError } = this.props;
        if (isConnected) {
            return (<Redirect to={'/' + user.name} />);
        }
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h2><label htmlFor="nickname">Got a nickname ?</label></h2>
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        id="nickname"
                        ref={(input) => this.textInput = input}
                        onChange={this.handleChange}
                        placeholder="My cool username"
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default">Go!</button>
                    </span>
                </div>
                { loginError ? <div className="alert alert-danger">{loginError}</div> : '' }
            </form>
        );
    }
}

LoginForm.propTypes = {
    socket: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setIsConnected: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    setLoginError: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    isConnected: state.isConnected,
    loginError: state.loginError,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setIsConnected: setIsConnectedAction,
    setLoginError: setLoginErrorAction,
}, dispatch);

// 或者对象写法：const mapDispatchToProps = { setIsConnected: setIsConnectedAction };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
