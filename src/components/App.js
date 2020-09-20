import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import PokemonPage from './PokemonPage';
import PokemonDetailsPage from './PokemonDetailsPage';
import Footer from './Footer';
import history from '../history';

import '../main.css';

class App extends React.Component {
    render() {
        return (
            <div class="site-container">
            <Router history={history}>
            <div class="site-content">
                <Header />
                <div style={{paddingTop: '3rem'}} className="ui container">
                    <div className="pusher">
                        <div className="ui padded basic segment">
                            <Router history={history}>
                                <Route path="/" exact >
                                    <Redirect to="/pokemon?page=1"/>
                                </Route>
                                <Route path="/pokemon" exact component={PokemonPage} />
                                <Route path="/pokemon/:id" exact component={PokemonDetailsPage} key={new Date()}/>
                            </Router>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>    
        </Router>
        </div>
        )
    }
}

export default App;