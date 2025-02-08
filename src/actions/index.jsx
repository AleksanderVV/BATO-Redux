export const dataFetching = () => {
    return {
        type: 'DATA_FETCHING'
    }
}

export const toolboxFetched = (toolbox) => {
    return {
        type: 'TOOLBOX_FETCHED',
        payload: toolbox
    }
}

export const dataFetchingError = () => {
    return {
        type: 'DATA_FETCHING_ERROR'
    }
}
export const toolboxChoose = (toolbox) => {
    return {
        type: 'TOOLBOX_CHOOSE',
        payload: toolbox
    }
}
export const toolboxColorFiltering = () => {
    return {
        type: 'TOOLBOX_COLOR_FILTER',
        payload: ''
    }
}
export const toolboxDrawersFiltering = () => {
    return {
        type: 'TOOLBOX_DRAWERS_FILTER',
        payload: ''
    }
}
export const toolboxWheelsFiltering = () => {
    return {
        type: 'TOOLBOX_WHEELS_FILTER',
        payload: ''
    }
}