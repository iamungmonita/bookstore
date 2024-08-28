import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useOutsideClick } from '@/hooks/useOutsideClick'
const index = ({ label, items, sendFunction }) => {
    const ref = useRef()
    const [dropdown, setDropdown] = useState(false)
    const [name, setName] = useState(false)
    const [error, setError] = useState('')

    const sendItemId = (id, name) => {
        if (id) {
            setName(name)
            sendFunction(id, name)
            setDropdown(false)
        }
    }

    const outsideClick = () => {
        if (ref.current && !ref.current.contains(event.target)) {
            setDropdown(false)
        }
    }

    useEffect(() => {
        window.addEventListener('mouseover', outsideClick)
        return () => {
            window.removeEventListener('mouseover', outsideClick)
        }
    }, [])

    return (
        <div
            ref={ref}
            className='flex flex-col gap-5 justify-between w-full'>
            {label && <label htmlFor={label.toLowerCase()} className='font-semibold'>{label}</label>}
            <div className='relative w-full py-2 px-5  bg-white' >
                <p className='flex items-center justify-between'
                    onMouseOver={() => setDropdown(!dropdown)}>{name ? name : 'Select Author'}
                    <span>{!dropdown
                        ? <ChevronDownIcon className='w-5 h-5' />
                        : <ChevronUpIcon className='w-5 h-5' />}
                    </span>
                </p>
                <div
                    className={`absolute left-0 ${dropdown ? 'top-[100%]' : 'top-[80%] opacity-0 border-none'} transition-all duration-300 w-full border shadow bg-white`}>
                    {dropdown && items.length &&
                        items.map((item) =>
                            <div
                                className='hover:bg-slate-100 py-2 px-5 w-full rounded-md'
                                onClick={() => sendItemId(item._id, item.name)}>{item.name}</div>)
                    }
                </div>
                <div className='text-sm text-red-500'>{error}</div>
            </div>
        </div>
    )
}

export default index