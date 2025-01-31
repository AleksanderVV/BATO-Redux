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