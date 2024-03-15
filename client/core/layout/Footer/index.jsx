import React from 'react'

const index = () => {
    const year = new Date().getFullYear()
    return (
        <footer className='p-5 flex justify-between border-t text-sm items-center flex-col'>
            <p>©{year} all rights reserved.</p>
        </footer >

    )
}

export default index