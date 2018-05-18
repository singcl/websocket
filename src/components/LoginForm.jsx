import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';

import { VERIFY_USER } from '../constants/Events';
import { createUser } from '../Factory';

import { setIsConnected as setIsConnectedAction } from '../actions/RootActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.verify = this.verify.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { socket } = this.props;
        socket.emit(VERIFY_USER, this.textInput.value, ({ isValid, kind }) => {
            if (!isValid) {
                console.log(isValid, kind);
                return;
            }

            const name = this.textInput.value;
            const { setUser, setIsConnected } = this.props;
            setUser(createUser({ name }));
            setIsConnected(true);
        });
    }

    render() {
        const { isConnected, user } = this.props;
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
                        placeholder="My cool username"
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default">Go!</button>
                    </span>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    socket: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setIsConnected: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    isConnected: state.isConnected,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setIsConnected: setIsConnectedAction }, dispatch);
// 或者对象写法：const mapDispatchToProps = { setIsConnected: setIsConnectedAction };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
