import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage';
import MoviesPage from './MoviesPage';
import SeriesPage from './SeriesPage';
import SeriesDetailsPage from './SeriesDetailsPage';
import Footer from './Footer';
import history from '../history';

import '../main.css';

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
            <div>
                <Header />
                <div style={{paddingTop: '3rem'}} className="ui container">
                    <div className="pusher">
                        <div className="ui padded basic segment">
                            <Router history={history}>
                                <Route path="/" exact component={HomePage} />
                                <Route path="/series" exact component={SeriesPage} />
                                <Route path="/seriesDetails/:id/:year" exact component={SeriesDetailsPage} />
                                <Route path="/movies" exact component={MoviesPage} />
                            </Router>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>    
        </Router>
        )
    }
}

export default App;