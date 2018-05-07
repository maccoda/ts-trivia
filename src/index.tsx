import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './App.css';

ReactDOM.render(<App title="Quiz Game" />, document.getElementById('root'));
registerServiceWorker();
