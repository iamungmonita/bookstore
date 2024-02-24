import React from 'react'
import Image from 'next/image'
import { USDollar } from '@/helpers'

const index = ({ url, title, author, price }) => {
    return (
        <div className="border p-5 bg-slate-100/50 hover:cursor-pointer hover:bg-slate-100">
            <Image src={"http://localhost:3001/" + url} alt="" width={250} height={300} className="mb-3" />
            <p className="text-lg font-semibold text-wrap">{title}</p>
            <p className='text-gray-600'>{author}</p>
            <p className='text-md font-semibold'>{USDollar.format(price)}</p>

        </div>
    )
}

export default index