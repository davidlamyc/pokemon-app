import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSeries } from '../actions';
import SecondaryHeader from './SecondaryHeader';

class SeriesPage extends React.Component {
    componentDidMount() {
        this.props.fetchSeries();
    }

    renderSeries = () => {
        return this.props.series.map(series => {
            return (
                <div class="ui card">
                    {
                        series.images['Poster Art'].url ? <div class="image">
                        <img src={series.images['Poster Art'].url} />
                        </div>: <div class="ui active dimmer">
                            <div class="ui loader"></div>
                        </div>
                    }
                    <div class="content">
                        <a class="header">{series.title}</a>
                        <div class="meta">
                            <span class="date">{series.releaseYear}</span>
                        </div>
                        <div class="description">
                            {series.description}
                        </div>
                    </div>
                    <div class="extra content">
                        <Link className="item" to={`/seriesDetails/${series.title}/${series.releaseYear}`}>
                            <button className="ui button">
                                Go to details &rarr;
                            </button>
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="ui container">
                <SecondaryHeader type="Series" />
                {this.renderSeries()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        series: state.series,
    }
}

export default connect(mapStateToProps, { fetchSeries })(SeriesPage);