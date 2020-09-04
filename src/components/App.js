import React from 'react';
import { Router, Route } from 'react-router-dom';
import axios from 'axios';

import history from '../history';

class App extends React.Component {
    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Header</h1>
                <Router history={history}>
                </Router>
            </div>
        )
    }
}

export default App;