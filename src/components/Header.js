import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui visible inverted top sidebar menu">
            <Link to={'/'}className="header item">
                <h3>Pokemon Finder</h3>
            </Link>
        </div>
    )
}

export default Header;