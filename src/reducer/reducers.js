import { combineReducers } from 'redux'

function status(state = 'initial', action) {
    switch (action.type) {
        case 'QUIZ_STARTED':
            return 'LOADED';
        default:
            return state
    }
}

//doesn't work yet
function artists(state = [], action) {
    switch (action.type) {
        case 'ADD_ARTIST':
            return Object.assign({}, state, {
                artists: [
                    ...state.artists, {data : action.artistObject}
                ]
            });
        default:
            return state
    }
}

const quizApp = combineReducers({
    status,
    artists
})

export default quizApp