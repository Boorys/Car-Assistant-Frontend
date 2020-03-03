export const carUserId = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_CAR_USER_ID':
            return action.text;
        default:
            return state
    }
}