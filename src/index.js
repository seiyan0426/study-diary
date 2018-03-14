// エントリーポイント
import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './App.js'

const render = () => (
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    )
);

render();