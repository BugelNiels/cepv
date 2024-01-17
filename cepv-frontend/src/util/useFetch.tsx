import { useEffect, useState } from 'react'



const useFetch = <T,>(url: string) => {

    const [result, setResult] = useState<T | null>(null);

    useEffect(() => {
        const fetchStuff = async (fetchEndPoint: string) => {
            try {
                console.log("Fetching", url);
                const res = await fetch(fetchEndPoint);
                if (!res.ok) {
                    console.log("Invalid response from server:", res);
                    return;
                }
                const data = await res.json();
                if (data) {
                    console.log("setting data", data);
                    setResult(data);
                } else {
                    console.log("Data not present: ", data, res);
                }
            } catch (err) {
                console.log("Error with fetching:", err);
            }
        }
        fetchStuff(url);
    }, [url]);
    return { result }
}

export { useFetch }