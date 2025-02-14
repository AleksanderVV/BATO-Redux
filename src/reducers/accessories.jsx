const initialState = {
    drawersData: {},
}

const accessories = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DRAWERS_DATA':
            return {
                ...state,
                drawersData: action.payload
            }
        default:
            return state;
    }
}

export default accessories;