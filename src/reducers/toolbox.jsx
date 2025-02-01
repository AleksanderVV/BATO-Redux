const initialState = {
    toolboxList: []
}

const toolbox = (state = initialState, action) => {
    switch (action.type) {
        case 'TOOLBOX_FETCHED':
            return {
                ...state,
                toolboxList: action.payload
            }
        default: return state
    }
}

export default toolbox;