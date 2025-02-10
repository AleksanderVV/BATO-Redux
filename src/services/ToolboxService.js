import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";

const useToolboxService = () => {
    const {request} = useHttp();

    const getAllToolbox = useCallback(async () => {
        const res = await request(`http://localhost:3001/boxes`);
        return res;
    }, [request]);

    const getAccessories = useCallback(async () => {
        const acc = await request('http://localhost:3001/accessories');
        return acc;
    }, [request]);

    const getAttachingAccessories = useCallback(async () => {
        const attachAcc = await request('http://localhost:3001/attachingAccessories');
        return attachAcc;
    }, [request]);

    return {
        getAllToolbox,
        getAccessories,
        getAttachingAccessories
    }
}

export default useToolboxService;