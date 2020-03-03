export const contactsSearch = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_CONTACTS':
            return action.text;
        case 'SEARCH_CAR_USER_ID':
            return action.text;
        default:
            return state
    }
}

