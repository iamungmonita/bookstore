import React, { useRef } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { NavLink, SearchBar, ShoppingCart } from "@/core/components"
import { useState, useEffect } from "react"
import { useGetState } from "@/hooks/useGetState"
import { useStore } from "@/store"
import Link from "next/link"
import { useRouter } from 'next/router'
import { getBooks } from '@/services'
import useApi from '@/useApi'


const NavBar = () => {
    const [refresh, setRefresh] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [toggleShoppingCart, setToggleShoppingCart] = useState(false)
    const [toggleSearchBar, setToggleSearchBar] = useState(false)
    const [togglePopUp, setTogglePopUp] = useState(false)
    const [showBook, setShowBook] = useState(false)
    const sidebarRef = useRef()
    const items = useGetState(useStore, (state) => state.items) ?? [];
    const [books, setBooks] = useState([])
    const [records, setRecords] = useState([])
    const removeItems = useStore((state) => state.removeItems)
    const promiseAll = () => Promise.resolve(getBooks())
    const { response } = useApi({ service: promiseAll(), effect: [] })
    useEffect(() => { setBooks(response), setRecords(response) }, [response.length])
    const searchBook = (e) => {
        setBooks(records.filter((record) => record.title.replace(/\s/g, "").includes(e.target.value.replace(/\s/g, ""))))
    }

    useEffect(() => {
        const handleScreen = () => {
            const screen = window.innerWidth
            if (screen > 640) {
                setToggle(false)
            }
        }
        window.addEventListener('resize', handleScreen)
    }, [])

    const removeAll = () => {
        removeItems()
        setTogglePopUp(!togglePopUp)
        setToggleShoppingCart(!toggleShoppingCart)
    }
    useEffect(() => { setToggle(false) }, [toggleShoppingCart])
    const handleOutsideClick = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setToggleShoppingCart(false)
            setToggle(false)
            setToggleSearchBar(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])
    const router = useRouter()
    const selectBook = (id) => {
        router.push(`/books/${id}`)
        setToggleSearchBar(false)
    }
    return (
        <div ref={sidebarRef}>
            <div className="p-5 flex border-b items-center md:justify-end justify-between relative">
                <ul className="text-sm hidden md:flex gap-10 items-center ">
                    <NavLink path='home' active={'/'} />
                    <NavLink path='contact' active={'/contact'} />
                    <NavLink path='location' active={'/location'} />
                    {toggleSearchBar &&
                        <div className='bg-slate-200  hover:cursor-pointer'>
                            <input type="search" placeholder='search book'
                                className='border-l py-1 px-2 outline-none '
                                onChange={searchBook} />
                            <div className='shadow bg-white absolute top-[100%] p-2 w-[200px]'>
                                {books.map((book) =>
                                    <div key={book._id} className='p-2 hover:border-b'
                                        onClick={() => selectBook(book._id)}
                                    >
                                        <p>{book.title}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    <MagnifyingGlassIcon className={`w-7 h-7 ${toggleSearchBar && 'text-slate-400'}`} onClick={() => setToggleSearchBar(!toggleSearchBar)} />
                    <li className="hover:font-semibold flex relative hover:cursor-pointer" onClick={() => setToggleShoppingCart(!toggleShoppingCart)}><ShoppingBagIcon className={`${items.length > 0 ? 'text-blue-700' : " text-slate-300"} h-7 w-7`} />
                    </li>
                </ul>
                <div
                    className="hover:cursor-pointer md:hidden"
                    onClick={() => {
                        if (toggleShoppingCart) {
                            setToggleShoppingCart(false)
                        }
                        setToggle(true)
                    }}>
                    <Bars3Icon className="h-7 w-7" />
                </div>

                <div className={`w-[450px] h-full flex flex-col fixed shadow bg-white ${toggle ? 'left-0' : '-left-[100%] '} transition-all duration-500 top-0 p-5`}>
                    <XMarkIcon className='h-7 w-7 self-end cursor-pointer' onClick={() => setToggle(false)} />
                    <ul className="text-sm gap-5 flex flex-col">
                        <NavLink path='home' active={'/'} />
                        <NavLink path='contact' active={'/contact'} />
                        <NavLink path='location' active={'/location'} />
                    </ul>
                </div>

                <div className="hover:cursor-pointer md:hidden flex gap-5 items-center">
                    <div className='flex items-center border'>
                        <input type="search" name="" id="" placeholder='Search books' className=' px-3 outline-none' />
                        <div className='border-l p-2'>
                            <MagnifyingGlassIcon className='w-7 h-7 ' />
                        </div>
                    </div>
                    <ShoppingBagIcon className={`${items.length > 0 ? 'text-blue-700' : " text-slate-300"} h-7 w-7`} onClick={() => setToggleShoppingCart(!toggleShoppingCart)} />
                </div>


                <div className={`fixed overflow-y-scroll top-0 ${toggleShoppingCart ? 'right-0' : '-right-[100%]'} duration-500 transition-all w-[450px] h-full bg-white shadow p-5`}>
                    <ShoppingCart
                        setToggleShoppingCart={setToggleShoppingCart}
                        setTogglePopUp={setTogglePopUp}
                        togglePopUp={togglePopUp}
                        removeItems={removeAll} />
                </div>


            </div>
        </div>
    )
}

export default NavBar