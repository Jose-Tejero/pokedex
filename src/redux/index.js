const INITIAL_STATE = {
    name: '',
    page: 1
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            }
        
        case 'HOLD_PAGE':
            return {
                ...state,
                page: action.payload
            }

        default:
            return state;
    }
}

export default reducer;