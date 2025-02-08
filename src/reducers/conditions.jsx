const initialState = {
    process: 'waiting',
    isMobile: false
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
        case 'CHECK_IS_MOBILE':
            return {
                ...state,
                isMobile: action
            }
        default: return state
    }
}

export default conditions;