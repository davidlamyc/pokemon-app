export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SERIES':
            return [ ...action.payload ];
        default:
            return state;
    }
}