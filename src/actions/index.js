import axios from 'axios';
import data from '../data.json';

export const fetchMovies = () => async dispatch => {
    const movies = data.entries.filter(entry => {
        return entry.programType === 'movie';
    })

    dispatch({ type: 'FETCH_MOVIES', payload: movies })
};

export const fetchSeries = () => async dispatch => {
    const series = data.entries.filter(entry => {
        return entry.programType === 'series';
    })

    dispatch({ type: 'FETCH_SERIES', payload: series })
};
