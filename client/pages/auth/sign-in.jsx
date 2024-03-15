
import Link from "next/link"
import { useState } from "react"

import { useRouter } from "next/router"
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid"
const sign_in = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setEmailError('')
        setPasswordError('')
        fetch('http://localhost:4000/auth/admin_login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then((data) => {
            if (data.password) {
                setPasswordError(data.password)
            }
            if (data.email) {
                setEmailError(data.email)
            }
            if (data.admin) {
                router.push('/admin')
            }
        }
        ).catch((err) => console.log(err))

    }
    return (
        <form action=""
            onSubmit={handleSubmit}
            className='flex flex-col bg-slate-100 p-5 border min-w-[400px]  top-[50%] left-[50%] absolute -translate-y-[50%] -translate-x-[50%]'>
            <h2 className='text-2xl text-center font-bold mb-5'>SIGN IN</h2>
            <div className='flex justify-evenly bg-white items-center border my-3'>
                <EnvelopeIcon className="h-5 w-20" />
                <input
                    className='px-5 w-full py-2 bg-white outline-none border-l'
                    type="email" name='email'
                    required
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='text-sm text-red-700'>{emailError}</div>

            <div className='flex justify-evenly bg-white items-center border my-3'>
                <LockClosedIcon className='h-5 w-20' />
                <input
                    className='px-5 w-full py-2 bg-white outline-none border-l'
                    required
                    placeholder='password'
                    type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='text-sm text-red-700'>{passwordError}</div>
            <input type="submit" value="Submit" className='bg-slate-300 hover:cursor-pointer py-2 px-5 font-semibold mt-3' />
            <Link className='bg-yellow-500 text-center hover:cursor-pointer py-2 px-5 font-semibold mt-3' href=' /'>BACK TO HOMEPAGE</Link>
        </form>
    )
}
export default sign_in