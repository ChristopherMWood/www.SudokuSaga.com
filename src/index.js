import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import BoardApi from 'api.js'
import store from './store/index'
window.store = store
window.board = new BoardApi()

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
