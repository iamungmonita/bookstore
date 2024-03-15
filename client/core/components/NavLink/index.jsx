import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
const index = ({ path, active }) => {
    const router = useRouter()
    const textColor = () => {
        if (router.asPath === active) {
            return true
        } else {
            return false
        }
    }

    return (
        <Link href={`${active}`} className={`${textColor() && ' py-3 px-2 md:p-0 md:bg-transparent font-bold md:text-black border-b-2 border-b-yellow-200'}`}>
            <div className='uppercase hover:font-semibold'>
                {path}
            </div>
        </Link>
    )
}

export default index