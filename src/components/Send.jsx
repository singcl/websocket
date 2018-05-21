import React from 'react';
import PropTypes from 'prop-types';

const Send = ({
    handleSend,
    isDisabledSend,
    handleChangeSend,
    typingValue,
}) => {
    let textInput = null;
    return (
        <form className="send" onSubmit={(e) => handleSend(e, textInput)}>
            <div className="input-group full-height">
                <input
                    type="text"
                    className="form-control full-height-change"
                    onChange={handleChangeSend}
                    value={typingValue}
                    ref={(input) => textInput = input}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-info full-height-change"
                        disabled={isDisabledSend}
                        onClick={(e) => handleSend(e, textInput)}
                    >
                        Send
                    </button>
                </span>
            </div>
        </form>
    );
};

Send.propTypes = {
    handleSend: PropTypes.func.isRequired,
    handleChangeSend: PropTypes.func.isRequired,
    isDisabledSend: PropTypes.bool.isRequired,
    typingValue: PropTypes.string.isRequired,
};

export default Send;
