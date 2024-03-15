import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { USDollar } from '@/helpers'
import { constAuthorId } from '@/constant/authorId'
import { getBooks, getAuthors } from '@/services'
import useApi from '@/useApi'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { Dropdown, InputText } from '@/core/components'

const admin = () => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [authorId, setAuthorId] = useState()
    const [page, setPage] = useState()
    const [qty, setQty] = useState()
    const [cartQty, setCartQty] = useState(1)
    const [categoryId, setCategoryId] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [refresh, setRefresh] = useState(false)
    const [form, setForm] = useState(null)
    const [loading, setLoading] = useState(false)
    const [bookList, setBookList] = useState([])
    const [adminUsername, setAdminUsername] = useState('')
    const router = useRouter()

    const handleLogout = () => {
        fetch('http://localhost:4000/auth/admin_logout', {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            if (res.ok) {
                router.push('/auth/sign-in')
            }
        }).catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            fetch('http://localhost:4000/upload-file', {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json()).then(async (res) => {
                    const fileUrl = res.message

                    fetch('http://localhost:4000/check-book', {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ title }),
                    }).then((res) => res.json()).then(async (data) => {
                        if (data.id) {
                            const { id } = data
                            fetch('http://localhost:4000/update-book', {
                                method: 'PUT',
                                body: JSON.stringify({ id, qty }),
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                            }).then((res) => res.json()).then((data) => {
                                setRefresh(!refresh)
                            }).catch(err => console.log(err))
                        } else {
                            const form = {
                                title,
                                price,
                                qty,
                                cartQty: 1,
                                author,
                                authorId,
                                categoryId,
                                description,
                                fileUrl,
                                page
                            }
                            fetch('http://localhost:4000/create-book', {
                                method: 'POST',
                                body: JSON.stringify(form),
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                            }).then((res) => res.json()).then(() => {
                                setRefresh(!refresh)
                            }).catch(err => console.log(err))
                        }
                    })

                })
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/auth/admin_cookie', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then((data) => {
            if (data.error) {
                router.push('/auth/sign-in')
            }
            if (data.decodedToken) {
                setAdminUsername(data.decodedToken.username);
            }
        }).catch(err => console.log(err))
    }, [])
    const bookPromise = () => Promise.resolve(getBooks())
    const authorPromise = () => Promise.resolve(getAuthors())
    const [authors, setAuthors] = useState([])
    const response = useApi({ service: bookPromise(), effect: [refresh] }).response
    const authorsList = useApi({ service: authorPromise(), effect: [refresh] }).response

    useEffect(() => { setBookList(response), setAuthors(authorsList) }, [response, authorsList, refresh])

    const sendFunction = (id) => {
        setAuthorId(id)
        setAuthor()
    }


    return (
        <>
            <div className='flex justify-end items-center mt-5 px-5'>
                <p className='py-1 px-5'><span className='font-semibold'>Admin: </span>{adminUsername}</p>
                <button className='py-1 px-5 border font-semibold bg-yellow-500 rounded-md' onClick={handleLogout}>Sign Out</button>
            </div>
            <div className='flex flex-col w-full items-start justify-between gap-5 md:flex-row'>
                <form className='p-5 flex-col flex gap-3 mt-10 border-b border-t min-w-[90%] mx-auto md:min-w-[50%] border bg-slate-50' onSubmit={handleSubmit}>
                    <h2 className='font-bold text-xl text-center mb-5'>Add New Book</h2>
                    <div className='flex items-center justify-around gap-5 lg:flex-row flex-col'>
                        <div className='flex flex-col gap-5 w-full '>
                            <div className='grid grid-cols-2 gap-5'>
                                <InputText
                                    label='Title'
                                    type="text"
                                    handleChange={(value) => { setTitle(value) }}
                                />
                                {/* <div className='flex gap-3 justify-between items-center'>
                                <label htmlFor="title" className='font-semibold'>Title</label>
                                <input onChange={(e) => setTitle(e.target.value)} type="text" name='title'
                                    className='py-2 px-5 border outline-none rounded-md' />
                            </div> */}
                                <Dropdown
                                    items={authors}
                                    label="Author"
                                    sendFunction={(id, name) => { setAuthorId(id), setAuthor(name) }} />
                            </div>
                            {/* <div className='flex gap-5 justify-between items-center'>
                                <label htmlFor="author" className='font-semibold'>Author</label>
                                <div className='relative w-full bg-red-200 py-2 px-5 border rounded-md'>
                                    <p
                                        className='flex items-center justify-between'
                                        onClick={() => setDropdown(!dropdown)}>{!author ? 'Select Author' : author}
                                        <span>{!dropdown ? <ChevronDownIcon className='w-5 h-5' /> : <ChevronUpIcon className='w-5 h-5' />} </span></p>
                                    <div className='absolute left-0 top-[100%] w-full border bg-slate-100 rounded-md'>
                                        {dropdown && authors.length &&
                                            authors.map((author) =>
                                                <div
                                                    className='hover:bg-white py-2 px-5 w-full bg-slate-100 rounded-md'
                                                    onClick={() => sendAuthorId(author._id, author.name)}>{author.name}</div>)
                                        }
                                    </div>
                                </div>
                            </div> */}
                            {/* <InputText
                                label='Description'
                                type="text"
                                handleChange={(value) => setDescription(value)}
                            /> */}
                            <div className='flex flex-col gap-5 justify-between'>
                                <label htmlFor="description" className='font-semibold'>Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} name='description'
                                    className='py-2 px-5 border w-full outline-none rounded-md' />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <InputText
                                    label='Page'
                                    type="number"
                                    handleChange={(value) => setPage(value)}
                                />
                                <InputText
                                    label='Qty'
                                    type="qty"
                                    handleChange={(value) => setQty(value)}
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <InputText
                                    label='CategoryId'
                                    type="number"
                                    handleChange={(value) => setCategoryId(value)}
                                />
                                <InputText
                                    label='Price'
                                    type="number"
                                    handleChange={(value) => setPrice(value)}
                                />
                            </div>

                            <div className='flex flex-col gap-5 justify-between w-full'>
                                <label htmlFor="price" className='font-semibold'>Cover</label>
                                <input type="file" name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])}
                                    className='py-2 px-5 border bg-white outline-none rounded-md' />
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='font-semibold bg-yellow-500 p-3 mt-5 rounded-md'>Add</button>
                </form >
                <div className='max-w-[90%] mx-auto md:min-w-[40%] mt-10 '>
                    <table className='text-center w-full'>
                        <thead>
                            <tr className='bg-slate-200'>
                                <th className=' border py-1 px-5'>No.</th>
                                <th className=' border py-1 px-5'>Title</th>
                                <th className=' border py-1 px-5'>Author</th>
                                <th className=' border py-1 px-5'>Qty</th>
                                <th className=' border py-1 px-5'>Price</th>
                            </tr>
                        </thead>
                        {bookList.length > 0 &&
                            <tbody className='odd:bg-slate-100 border-collapse'>
                                {bookList.map((book, index) => <tr cl key={book._id}>
                                    <td className=' border py-1 px-5'>{index + 1}</td>
                                    <td className=' border py-1 px-5'>{book.title}</td>
                                    <td className=' border py-1 px-5'>{book.author}</td>
                                    <td className=' border py-1 px-5'>{book.qty}</td>
                                    <td className=' border py-1 px-5'>{USDollar.format(book.price)}</td>

                                </tr>)}
                            </tbody>
                        }
                    </table>
                </div>
            </div >

        </>
    )
}

export default admin

