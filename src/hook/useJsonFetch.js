import { useEffect, useState } from 'react';

export default function useJsonFetch(url, options) {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(url, options);

                if (response.status !== 200) {
                    throw new Error(`Network error: ${response.status} - ${response.statusText}`);
                }

                if (response.ok) {
                    const json = await response.json();
                    if (!json) {
                        throw new Error('parsing error');
                    }
                    setData(json);
                }
            } catch (err) {
                setError(err);
                setData('');
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [options, url]);

    return [loading, error, data];
}