import { useEffect, useState } from "react"

export default function useApi(params) {
    const { service = () => { }, effect } = params
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [response, setResponse] = useState([])
    const [error, setError] = useState(false)
    useEffect(() => {
        setLoading(true)
        service.then((res) => res.json()).then((data) => {
            setResponse(data)
            setLoading(false)
            setLoaded(true)
        }).catch((err) => {
            setError(err)
            setLoading(false)
            setLoaded(true)
        })

    }, effect)

    return {
        response,
        loading,
        loaded,
        error

    }
}