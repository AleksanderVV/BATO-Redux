import { useEffect } from "react"

const useBodyID = (id) => {
    useEffect(() => {
        document.body.id = id;
        return () => {
            document.body.id = '';
        }
    }, [id])
}

export default useBodyID;