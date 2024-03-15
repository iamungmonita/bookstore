import React from 'react'

const index = ({ label, handleChange, type }) => {
    return (
        <div className='flex flex-col gap-3 justify-between w-full'>
            {label && <label htmlFor={label.toLowerCase()} className='font-semibold'>{label}</label>}
            <input onChange={(e) => handleChange(e.target.value)} type={type} name={label.toLowerCase()}
                className='py-2 px-5 border outline-none rounded-md' />
        </div>
    )
}

export default index