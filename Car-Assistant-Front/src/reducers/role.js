export const role = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_ROLE':
            return action.text;
        default:
            return state
    }
}