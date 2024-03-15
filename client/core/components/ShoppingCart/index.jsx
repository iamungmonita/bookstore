import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useGetState } from '@/hooks/useGetState'
import { useStore } from '@/store'
import { USDollar } from '@/helpers'
import { useRouter } from 'next/router'

const ShoppingCart = ({ togglePopUp, setToggleShoppingCart, setTogglePopUp, removeItems }) => {
    const router = useRouter()
    const items = useGetState(useStore, (state) => state.items) ?? [];
    const increaseItemQty = useStore((state) => state.increaseItemQty)
    const decreaseItemQty = useStore((state) => state.decreaseItemQty)
    const updateItems = useStore((state) => state.updateItems)
    const decreaseQty = useStore((state) => state.decreaseQty)
    const decreaseAmount = useStore((state) => state.decreaseAmount)
    const [refresh, setRefresh] = useState(false)

    const handleDelete = (index) => {
        if (items > 1) {
            decreaseAmount(items[index].price);
            decreaseQty()
            items.splice(index - 1, index)
        }
        else {
            decreaseAmount(items[index].price);
            decreaseQty()
            items.splice(index, 1)
        }
        updateItems(items)
    }

    const handleIncreaseItemQty = (index, qty) => {
        increaseItemQty(index, qty)
        setRefresh(!refresh)
    }
    const handleDecreaseItemQty = (index, qty) => {
        decreaseItemQty(index, qty)
        setRefresh(!refresh)
    }

    const totalItems = () => {
        const quantity = items.map((e) => e.cartQty);
        const result = quantity.reduce((a, b) => {
            return a + b
        }, 0)
        return result
    }
    const totalAmount = () => {
        const price = items.map((e) => e.cartQty * e.price);
        const result = price.reduce((a, b) => {
            return a + b
        }, 0)
        return result
    }

    const redirectPath = (path) => {
        router.push(`/${path}`)
    }

    useEffect(() => { }, [refresh, items])

    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <XMarkIcon className="h-7 w-7 cursor-pointer" onClick={() => setToggleShoppingCart(false)} />
                </div>
                {
                    items.length > 0 &&
                    <div className="text-sm mt-10 flex flex-col items-stretch">
                        {items.map((item, index) =>
                            <div key={index} className="flex items-center">
                                <div className="flex w-full items-center justify-between p-2  gap-3 border-b ">
                                    <div className='flex justify-start gap-3 w-[60%]'>
                                        <h2 className='font-semibold border-r border-r-gray-600 pr-2'>{index + 1}</h2>
                                        <h2>{item.title}</h2>
                                    </div>
                                    <div className='flex items-center justify-between w-[40%]'>
                                        <h2>{USDollar.format(item.price)}</h2>
                                        <div className='flex items-center w-20 justify-between'>
                                            <MinusIcon className='w-4 h-4 font-semibold text-slate-600' onClick={() => handleDecreaseItemQty(index, 1)} />
                                            {(item.cartQty)}
                                            <PlusIcon className='w-4 h-4 font-semibold text-slate-600' onClick={() => handleIncreaseItemQty(index, 1)} />
                                        </div>
                                    </div>
                                </div>
                                <TrashIcon className="w-4 h-4 text-red-500 ml-3" onClick={() => handleDelete(index)} />
                            </div>
                        )}
                    </div>
                }
            </div>
            {togglePopUp &&
                <div className='bg-black/80 w-full p-50 h-full fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                    <div className='bg-slate-100 w-50 h-50 p-20 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute'>
                        Do you want to remove all items from cart?
                        <div className='flex gap-5 justify-center'>
                            <button className='border w-52  py-1 px-5 mt-10 border-slate-300' onClick={removeItems}>Yes</button>
                            <button className='border w-52  py-1 px-5 bg-slate-300 mt-10' onClick={() => setTogglePopUp(false)}>No</button>
                        </div>
                    </div>

                </div>
            }
            <div>
                <h2 className="text-lg font-semibold mt-10">Total Items: {totalItems()}</h2>
                <h2 className="text-lg font-semibold">Subtotal: {USDollar.format(totalAmount())}</h2>
                <button className='bg-slate-200 py-2 px-5 w-full mt-5 hover:font-semibold' onClick={() => redirectPath('/cart')}>
                    CHECKOUT
                </button>
                <button className={`w-full p-2 ${items.length === 0 ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-black'} mt-5 hover:font-semibold`} disabled={items.length === 0}
                    onClick={() => setTogglePopUp(true)}>REMOVE ALL ITEMS</button>
            </div>
        </div>
    )
}

export default ShoppingCart