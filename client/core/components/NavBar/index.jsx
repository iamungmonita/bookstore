import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCart } from "@/core/components"
import { useState, useEffect } from "react"
import { useGetState } from "@/hooks/useGetState"
import { useStore } from "@/store"
import Link from "next/link"
import { useRouter } from 'next/router'


const NavBar = () => {
    const router = useRouter()
    const [toggle, setToggle] = useState(false)
    const [toggleShoppingCart, setToggleShoppingCart] = useState(false)
    const [togglePopUp, setTogglePopUp] = useState(false)
    const items = useGetState(useStore, (state) => state.items) ?? [];
    const removeItems = useStore((state) => state.removeItems)

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

    return (
        <div>
            <div className="p-5 flex border-b items-center md:justify-end justify-between">
                <ul className="text-sm hidden md:flex gap-10 items-center">
                    <Link href='/' className="hover:font-semibold" >HOME</Link>
                    <Link className="hover:font-semibold" href="/">CONTACT</Link>
                    <Link className="hover:font-semibold" href="/">LOCATION</Link>
                    <li className="hover:font-semibold flex relative hover:cursor-pointer" onClick={() => setToggleShoppingCart(!toggleShoppingCart)}><ShoppingBagIcon className={`${items.length > 0 ? 'text-blue-700' : " text-slate-300"} h-7 w-7`} />
                    </li>
                </ul>
                <div
                    className="hover:cursor-pointer md:hidden"
                    onClick={() => setToggle(!toggle)}>
                    {toggle ?
                        <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-7 w-7" />}
                </div>
                {
                    toggle &&
                    <div className="w-[350px] h-full fixed shadow bg-white left-0 top-0 p-5">
                        <ul className="text-sm gap-5 flex flex-col">
                            <Link href='/' className="hover:font-semibold py-2 border-b px-5">HOME</Link>
                            <Link href='/' className="hover:font-semibold py-2 border-b px-5" >CONTACT</Link>
                            <Link href='/' className="hover:font-semibold py-2 border-b px-5" >LOCATION</Link>
                        </ul>
                    </div>
                }
                <div className="hover:cursor-pointer md:hidden">
                    <ShoppingBagIcon className={`${items.length > 0 ? 'text-blue-700' : " text-slate-300"} h-7 w-7`} onClick={() => setToggleShoppingCart(!toggleShoppingCart)} />
                </div>

                {toggleShoppingCart &&
                    <div className="fixed overflow-y-scroll top-0 right-0 w-[450px] h-full bg-white shadow p-5">
                        <ShoppingCart
                            setToggleShoppingCart={setToggleShoppingCart}
                            setTogglePopUp={setTogglePopUp}
                            togglePopUp={togglePopUp}
                            removeItems={removeAll} />
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar