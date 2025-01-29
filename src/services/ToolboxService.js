import { useHttp } from "../hooks/http.hook";

const useToolboxService = () => {
    const {request, process, setProcess, clearError} = useHttp();

    const getAllToolbox = async () => {
        const res = await request(`http://localhost:3001/boxes`);
        return res;
    }

    const getAccessories = async () => {
        const acc = await request('http://localhost:3001/accessories');
        return acc;
    }

    const getAttachingAccessories = async () => {
        const attachAcc = await request('http://localhost:3001/attachingAccessories');
        return attachAcc;
    }

    return {
        process,
        setProcess,
        clearError,
        getAllToolbox,
        getAccessories,
        getAttachingAccessories
    }
}

export default useToolboxService;