const initialState = {
    toolboxList: [],
    currentToolbox: null,
    toolboxFilters: {
        wheels: 'all',
        color: 'all',
        numberDrawers: 'all'
    }
}

const toolbox = (state = initialState, action) => {
    switch (action.type) {
        case 'TOOLBOX_FETCHED':
            return {
                ...state,
                toolboxList: action.payload
            }
        case 'TOOLBOX_CHOOSE':
            return {
                ...state,
                currentToolbox: action.payload
            }
        case 'UPDATE_TOOLBOX_FILTER':
            return {
                ...state,
                toolboxFilters: {
                    ...state.toolboxFilters,
                    [action.payload.filterType]: action.payload.value
                }
            }
        default: return state
    }
}

export default toolbox;