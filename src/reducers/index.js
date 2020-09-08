import { combineReducers } from 'redux';

import movieReducer from './moviesReducer';
import seriesReducer from './seriesReducer';

export default combineReducers({
    movies: movieReducer,
    series: seriesReducer
})