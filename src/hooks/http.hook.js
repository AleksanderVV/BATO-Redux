import { useCallback } from "react";

export const useHttp = () => {

    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = "GET", body = null, headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {

            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            // setProcess('confirmed');

            return data;

        } catch(error) {
            // setProcess('error');
            console.error(error);
            throw error;
        }
    }, []);

    // const clearError = useCallback(() => setProcess('loading'), []);

    return {request, 
        // process, 
        // setProcess, 
        // clearError
    }

}