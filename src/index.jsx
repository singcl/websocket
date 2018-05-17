import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import App from './App.jsx';
import reducer from './reducers/RootReducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
registerServiceWorker();
