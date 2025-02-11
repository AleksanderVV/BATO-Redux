import { type } from "@testing-library/user-event/dist/type"


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
export const updateToolboxFilter = (filterType, value) => {
    return {
        type: 'UPDATE_TOOLBOX_FILTER',
        payload: {filterType, value}
    }
}
export const checkIsMobile = (isMobile) => {
    return {
        type: 'CHECK_IS_MOBILE',
        payload: isMobile
    }
}
export const checkIsSticky = (isSticky) => {
    return {
        type: 'CHECK_IS_STICKY',
        payload: isSticky
    }
}