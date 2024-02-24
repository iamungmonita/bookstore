import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const admin = () => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [authorId, setAuthorId] = useState()
    const [page, setPage] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [refresh, setRefresh] = useState(false)
    const [form, setForm] = useState(null)
    const [loading, setLoading] = useState(false)
    const [bookList, setBookList] = useState([])
    const { status, data } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/auth/sign-in')
        }
    }, [status])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            fetch('http://localhost:3001/upload-file', {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json()).then(async (res) => {
                    const form = {
                        title,
                        author,
                        authorId,
                        page,
                        price,
                        description,
                        fileUrl: res.message
                    }
                    fetch('http://localhost:3001/create-book', {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(form),
                    }).then((res) => res.json()).then(() => {
                        setRefresh(!refresh)
                    })

                })
        }
    }
    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3001/get-books', {
            method: "GET"
        }).then((response) => response.json()).then((res) => {
            setBookList(res)
            setLoading(false)
        })
    }, [refresh])
    return (
        <>
            {status === "authenticated" &&
                <div className='flex w-full items-start justify-between gap-5'>
                    <form className='p-5 flex-col flex gap-3 mt-10 border-b border-t max-w-[40%] bg-slate-200' onSubmit={handleSubmit}>
                        <h2 className='font-bold text-xl text-center mb-5'>Add New Book</h2>
                        <div className='flex items-center justify-around gap-5 lg:flex-row flex-col'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex gap-3 justify-between items-center'>
                                    <label htmlFor="title" className='font-semibold'>Title</label>
                                    <input onChange={(e) => setTitle(e.target.value)} type="text" name='title' className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                                <div className='flex gap-5 justify-between items-center'>
                                    <label htmlFor="author" className='font-semibold'>Author</label>
                                    <input onChange={(e) => setAuthor(e.target.value)} type="text" name='author' className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                                <div className='flex gap-5 justify-between items-center'>
                                    <label htmlFor="authorId" className='font-semibold'>Author ID</label>
                                    <input onChange={(e) => setAuthorId(e.target.value)} type="number" name='authorId' className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                                <div className='flex gap-5 justify-between items-center'>
                                    <label htmlFor="page" className='font-semibold'>Description</label>
                                    <input onChange={(e) => setDescription(e.target.value)} type='textarea' name='page' className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                                <div className='flex gap-5 justify-between items-center'>
                                    <label htmlFor="page" className='font-semibold'>Page No</label>
                                    <input onChange={(e) => setPage(e.target.value)} type="number" name='page' className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                                <div className='flex gap-5 justify-between items-center'>
                                    <label htmlFor="price" className='font-semibold'>Price</label>
                                    <input onChange={(e) => setPrice(e.target.value)} type="number" name='price' className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                                <div className='flex gap-5 justify-between items-center'>
                                    <label htmlFor="price" className='font-semibold'>Cover</label>
                                    <input type="file" name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])} className='py-2 px-5 border bg-slate-100 outline-none rounded-md' />
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='font-semibold bg-yellow-500 p-3 mt-5 rounded-md'>Add</button>
                    </form >
                    <div className='w-[80%] mt-10'>
                        <table className='text-center'>
                            <thead>
                                <tr className='bg-slate-200'>
                                    <th className='min-w-32 border py-1 px-10'>Title</th>
                                    <th className='min-w-32 border py-1 px-10'>Author</th>
                                    <th className='min-w-32 border py-1 px-10'>Author ID</th>
                                    <th className='min-w-32 border py-1 px-10'>Page</th>
                                    <th className='min-w-32 border py-1 px-10'>Price</th>
                                </tr>
                            </thead>
                            {bookList.length > 0 &&
                                <tbody className='odd:bg-slate-100 border-collapse'>
                                    {bookList.map((book) => <tr cl key={book._id}>
                                        <td className='min-w-32 border py-1 px-10'>{book.title}</td>
                                        <td className='min-w-32 border py-1 px-10'>{book.author}</td>
                                        <td className='min-w-32 border py-1 px-10'>{book.authorId}</td>
                                        <td className='min-w-32 border py-1 px-10'>{book.page}</td>
                                        <td className='min-w-32 border py-1 px-10'>{book.price}</td>

                                    </tr>)}
                                </tbody>
                            }
                        </table>

                    </div>
                </div>
            }
        </>

    )
}

export default admin

