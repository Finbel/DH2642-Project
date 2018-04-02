export default function status(state = 'initial', action) {
    switch (action.type) {
        case 'QUIZ_STARTED':
            return 'LOADED';
        default:
            return state
    }
}