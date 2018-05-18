import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { VERIFY_USER } from '../constants/Events';
import { createUser } from '../Factory';

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
            const { setUser } = this.props;
            setUser(createUser({ name }));
        });
    }

    render() {
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
    socket: PropTypes.object,
    setUser: PropTypes.func.isRequired,
};


export default LoginForm;
