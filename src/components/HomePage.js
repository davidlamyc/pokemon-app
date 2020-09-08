import React from 'react';
import { Link } from 'react-router-dom';

import Reel from '../img/reel.jpg';
import SecondaryHeader from './SecondaryHeader';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <SecondaryHeader type="Titles" />
                <Link class="ui card" to="/series">
                    <div class="image">
                        <img src={Reel} />
                    </div>
                    <div class="content">
                        <a class="header">Popular Series</a>
                    </div>
                </Link>
                <Link class="ui card" to="/movies">
                    <div class="image">
                        <img src={Reel} />
                    </div>
                    <div class="content">
                        <a class="header">Popular Movies</a>
                    </div>
                </Link>
            </div>
        )
    }
}

export default HomePage;
