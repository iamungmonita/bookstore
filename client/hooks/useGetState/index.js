import { useEffect, useState } from 'react';

export function useGetState(store, callback) {
    const [state, setState] = useState();
    const result = store(callback);
    useEffect(() => {
        setState(result);
    }, [result]);
    return state;
}
