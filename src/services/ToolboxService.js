import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";

const useToolboxService = () => {
    const {request} = useHttp();

    const getAllToolbox = useCallback(async () => {
        const res = await request(`http://localhost:3001/boxes`);
        return res;
    }, [request]);

    return {getAllToolbox}
}

const httpRequest = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return await response.json();
};

// Функции для использования вне хуков
const getAccessoriesDirect = async () => {
    return await httpRequest('http://localhost:3001/accessories');
};

const getAttachingAccessoriesDirect = async () => {
    return await httpRequest('http://localhost:3001/attachingAccessories');
};

export { getAccessoriesDirect, getAttachingAccessoriesDirect };
export default useToolboxService;