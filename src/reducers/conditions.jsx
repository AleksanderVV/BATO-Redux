const initialState = {
    process: 'waiting',
    isMobile: false,
    isSticky: false,
    isMenuOpen: false
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
                isMobile: action.isMobile
            }
        case 'CHECK_IS_STICKY':
            return {
                ...state,
                isSticky: action.isSticky
            }
        case 'CHECK_IS_MENU_OPEN':
            return {
                ...state,
                isMenuOpen: action.isMenuOpen
            }
        default: return state
    }
}

export default conditions;