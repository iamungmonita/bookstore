import { NavBar } from '@/core/components'
import { getBooks } from '@/services'
import useApi from '@/useApi'
import React, { useEffect, useState } from 'react'

const location = () => {
    const [books, setBooks] = useState([])
    const [records, setRecords] = useState([])
    const promiseAll = () => Promise.resolve(getBooks())
    const { response } = useApi({ service: promiseAll(), effect: [] })
    useEffect(() => setBooks(response), [response.length])
    const searchQuery = (e) => {
        // console.log(e.target.value);
        fetch(`http://localhost:4000/test/${e.target.value}`, {
            method: 'GET'
        }).then((res) => res.json()).then((data) => {
            setBooks(set)
        })
    }
    return (
        <div>
            <NavBar />
            <input type="text" name="" id="" onChange={searchQuery} className='bg-slate-100' />
        </div>
    )
}

export default location