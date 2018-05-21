import React from 'react';
import PropTypes from 'prop-types';

const Messages = ({ msgs }) => {
    const getInfo = (msg) => {
        const { senderName, content, receivedAt } = msg;
        return `${receivedAt} ${senderName}: ${content}`;
    };

    const getColor = (msg) => ({ color: msg.color });

    const mapMsgsToLi = (msgs) => (
        msgs.map((msg) => <li key={msg.id} style={getColor(msg)}>{getInfo(msg)}</li>)
    );

    return (
        <ul className="messages">
            {mapMsgsToLi(msgs)}
        </ul>
    );
};

Messages.propTypes = {
    msgs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        senderName: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        receivedAt: PropTypes.string.isRequired,
    })).isRequired,
};

export default Messages;
