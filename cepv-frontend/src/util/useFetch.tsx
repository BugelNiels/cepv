import { useEffect, useState } from 'react'


const useFetch = (url: string) => {

    const [result, setResult] = useState(null);

    useEffect(() => {
        console.log("|use effecting")
        const fetchStuff = async (fetchEndPoint: string) => {
            try {
                const res = await fetch(fetchEndPoint);
                if (!res.ok) {
                    console.log(res);
                } else {
                    const json = await res.json();
                    setResult(json);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchStuff(url);
    }, [url]);
    return { result }
}

export { useFetch }