
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AHelmet } from '@/core/components'
import Link from 'next/link'
import { useStore } from '@/store'
import { useGetState } from '@/hooks/useGetState'
import { NavBar } from '@/core/components'
import { HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'

const index = () => {
    const router = useRouter()
    const { id } = router.query
    const [bookList, setBookList] = useState([])
    const [bookId, setBookId] = useState([])
    const [refresh, setRefresh] = useState(false)
    const addToCart = useStore((state) => state.addToCart)
    const addAmount = useStore((state) => state.addAmount)
    const increaseItemQty = useStore((state) => state.increaseItemQty)
    const [qty, setQty] = useState(1)
    const increaseQty = useStore((state) => state.increaseQty)
    const [togglePopUp, setTogglePopUp] = useState(false)
    const items = useGetState(useStore, (state) => state.items) ?? [];
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        fetch(`http://localhost:3001/books/${id}`, {
            method: 'GET'
        })
            .then((res) => res.json().then((res) => {
                setBookList(res)
                setRefresh(!refresh)
            }))
    }, [refresh])

    useEffect(() => {
        if (bookList.length > 0) {
            setBookId(bookList);
        }
    }, [refresh])

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const sendToCart = (id) => {
        const result = bookId.find((book) => book._id === id)
        const ExistingBook = items.find((exist) => exist._id === id)
        if (!ExistingBook) {
            setTimeout(() => {
                addToCart(result)
                addAmount(result.price)
                setRefresh(!refresh)
                setTogglePopUp(false)
            }, 1000);
        } else {
            const final = items.indexOf(ExistingBook)
            setTimeout(() => {
                increaseItemQty(final, 1);
                setRefresh(!refresh)
                setTogglePopUp(false)
            }, 1000);
        }
        setTogglePopUp(true)
    }

    return (
        <>
            <NavBar />
            <div className='max-w-7xl mx-auto mt-5'>
                {bookId.map((book) =>
                    <form onSubmit={handleSubmit} key={book._id} className='flex gap-10 flex-col p-5 items-center md:items-start md:flex-row'>
                        <AHelmet>{book.title} : {book.author}</AHelmet>
                        <Image src={"http://localhost:3001/" + book.fileUrl} alt="" width={400} height={400} className="mb-3" />
                        <div className='flex flex-col items-center md:items-start'>
                            <h2 className='text-2xl font-semibold'>{book.title}</h2>
                            <h2>{book.author}</h2>
                            <p>{USDollar.format(book.price)}</p>
                            <p className='mt-10 text-center md:text-start'>{book.description}</p>
                            <button className='border bg-slate-300 py-1 px-5 mt-10' onClick={() => sendToCart(book._id)} >Add To Cart</button>
                        </div>
                    </form>
                )}
                {togglePopUp &&
                    <div className='bg-black/80 w-full p-50 h-full fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                        <div className='w-50 h-50 flex flex-col items-center justify-center bg-white p-10 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute'>
                            <p><span className='font-semibold'>{bookId[0].title} by {bookId[0].author}</span>  is being added to cart...</p>
                            <Image src='/loading.gif' alt='' width={100} height={100} />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default index