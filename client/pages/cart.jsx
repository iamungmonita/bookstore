import { useGetState } from "@/hooks/useGetState";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import { useRouter } from "next/router";
import { AHelmet } from "@/core/components";
import { USDollar } from "@/helpers"

const cart = () => {
    const items = useGetState(useStore, (state) => state.items) ?? [];
    const removeItems = useStore((state) => state.removeItems)
    const amount = useGetState(useStore, (state) => state.amount)
    const [togglePopUp, setTogglePopUp] = useState(false)
    const router = useRouter()
    const handlePopUp = () => {
        setTimeout(() => {
            router.push('/')
            removeItems()
        }, 3000);
        setTogglePopUp(!togglePopUp)
    }

    const totalItems = () => {
        const qty = items.map((e) => e.qty)
        const totalItems = qty.reduce((a, b) => {
            return a + b
        }, 0)
        return totalItems
    }

    return (
        <div className="p-5 md:max-w-[50%] mx-auto flex flex-col justify-between h-full">
            <AHelmet>Checkout</AHelmet>
            <h2 className="text-2xl font-semibold text-center mt-5">Checkout</h2>
            {
                items.length > 0 &&
                <div className="mt-10">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="bg-slate-200">
                                <th className="min-w-10 border-r">No.</th>
                                <th className="min-w-26 border-r text-left pl-2">Title</th>
                                <th className="min-w-26 border-r">Qty</th>
                                <th className="min-w-26 border-r">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="even:bg-slate-100/50">
                            {items.map((item, index) =>
                                <tr className="border">
                                    <td className="min-w-10 border-r font-sem">{index + 1}</td>
                                    <td className="min-w-26 border-r text-left pl-2">{item.title}</td>
                                    <td className="min-w-26 border-r">{item.qty}</td>
                                    <td className="min-w-26 border-r">{USDollar.format(item.price)}</td>
                                </tr>
                            )}
                            <tr className="border bg-orange-200/50 font-bold">
                                <td className="min-w-10 "></td>
                                <td className="min-w-26 ">TOTAL</td>
                                <td className="min-w-26 border-r border-y">{totalItems()}</td>
                                <td className="min-w-26 border-r border-y">{USDollar.format(amount)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            {togglePopUp &&
                <div className='bg-black/80 w-full p-50 h-full fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                    <div className='bg-slate-100 w-50 h-50 p-20 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute'>
                        Your payment is complete!
                        Thank you for shopping with us.
                    </div>
                </div>
            }
            <div className="mt-10 w-[70%] mx-auto">
                <button className="flex gap-5 items-center justify-center bg-slate-200 py-2 px-5 w-full mb-2 hover:font-semibold" onClick={handlePopUp}> PAY BY CARD</button>
                <Link href={'/'} className="flex hover:font-semibold gap-5 items-center justify-center bg-slate-100 py-2 px-5 w-full"> <ArrowLeftIcon className='w-7 h-7' /> Continue Shopping</Link>
            </div>
        </div>
    )
}
export default cart