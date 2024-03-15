import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
const index = ({ label, items, sendFunction }) => {
    const [dropdown, setDropdown] = useState(false)
    const [name, setName] = useState(false)
    const sendItemId = (id, name) => {
        setName(name)
        sendFunction(id, name)
        setDropdown(false)
    }
    return (
        <div className='flex flex-col gap-5 justify-between w-full'>
            {label && <label htmlFor={label.toLowerCase()} className='font-semibold'>{label}</label>}
            < div className='relative w-full py-2 px-5 border bg-white rounded-md' >
                <p className='flex items-center justify-between'
                    onClick={() => setDropdown(!dropdown)}>{name ? name : 'Select Author'}
                    <span>{!dropdown
                        ? <ChevronDownIcon className='w-5 h-5' />
                        : <ChevronUpIcon className='w-5 h-5' />}
                    </span>
                </p>
                <div
                    className={`absolute left-0 ${dropdown ? 'top-[100%]' : 'top-[80%] opacity-0 border-none'} transition-all duration-300 w-full border bg-slate-100 rounded-md`}>
                    {dropdown && items.length &&
                        items.map((item) =>
                            <div
                                className='hover:bg-white py-2 px-5 w-full rounded-md'
                                onClick={() => sendItemId(item._id, item.name)}>{item.name}</div>)
                    }
                </div>
            </div >
        </div >
    )
}

export default index