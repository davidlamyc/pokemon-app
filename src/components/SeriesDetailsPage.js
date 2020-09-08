import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSeries } from '../actions';

class SeriesDetailsPage extends React.Component {
    state = {
        yearFact: ''
    }

    componentDidMount = () => {
        console.log('did mount', this.props);
        axios.get(`http://numbersapi.com/${this.props.year}/year`)
            .then(response => {
                console.log(response.data)
                this.setState({ yearFact: response.data })
            })
    }

    render() {
        console.log("&&&&&", this.props)
        if (this.props.series) {
            return (
                <div class="ui modal active">
                    <div class="header">
                        {this.props.series.title}
                        <span> ({this.props.series.releaseYear})</span>
                    </div>
                    <div class="image content">
                        <div class="ui medium image">
                        <img src={this.props.series.images['Poster Art'].url}/>
                        </div>
                        <div class="description">
                        <div class="ui header">{this.props.series.description}</div>
                        <p style={{fontWeight: "bold"}}>What happened in the year when the movie came out?</p>
                        <p>{this.state.yearFact}</p>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="ui black deny button">
                            <Link className="item" to="/series" style={{color: 'white'}}>Back to Series &rarr;</Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="ui active modal">
                    <div class="header">
                        We don't have what you're looking for sorry!
                    </div>
                        <div class="actions">
                            <div class="ui black deny button">
                                <Link className="item" to="/series" style={{color: 'white'}}>Back to Series &rarr;</Link>
                            </div>
                        </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {

    console.log('single',ownProps.match.params.id);
    console.log('all',state.series);
    const series = state.series.find(series => { 
        return series.title === ownProps.match.params.id
    });
    return { series, year: ownProps.match.params.year };
}

export default connect(mapStateToProps, { fetchSeries })(SeriesDetailsPage);