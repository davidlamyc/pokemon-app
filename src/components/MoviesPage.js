import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions';

import SecondaryHeader from './SecondaryHeader';

class MoviesPage extends React.Component {
    componentDidMount() {
        this.props.fetchMovies();
    }

    renderMovies = () => {
        return this.props.movies.map(movie => {

            return (
                <div class="ui card">
                    {movie.images['Poster Art'].url ? <div class="image">
                    <img src={movie.images['Poster Art'].url} />
                    </div>: <div class="ui active dimmer">
                        <div class="ui loader"></div>
                    </div>}
                    <div class="content">
                        <a class="header">{movie.title}</a>
                        <div class="meta">
                            <span class="date">{movie.releaseYear}</span>
                        </div>
                        <div class="description">
                            {movie.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="ui container">
                <SecondaryHeader type="Movies" />
                {this.renderMovies()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        movies: state.movies,
    }
}

export default connect(mapStateToProps, { fetchMovies })(MoviesPage);