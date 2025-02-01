const initialState = {
    process: 'waiting'
}

const conditions = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA_FETCHING':
            return {
                ...state,
                process: 'loading'
            }
        case 'TOOLBOX_FETCHED':
            return {
                ...state,
                process: 'confirmed'
            }
        case 'DATA_FETCHING_ERROR':
            return {
                ...state,
                process: 'error'
            }
        default: return state
    }
}

export default conditions;