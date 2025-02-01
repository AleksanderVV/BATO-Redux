const initialState = {
    toolboxList: [],
    currentToolbox: null
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
        default: return state
    }
}

export default toolbox;