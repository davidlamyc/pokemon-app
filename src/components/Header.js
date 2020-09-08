import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{backgroundColor: '#0E6EB8'}} className="ui visible inverted top sidebar menu">
            <div className="header item">
                DEMO Streaming
            </div>
            <Link className="item" to="/">
                Login
            </Link>
            <Link className="item" to="/">
                <button className="ui button">
                    Start your free trial
                </button>
            </Link>
        </div>
    )
}

export default Header;