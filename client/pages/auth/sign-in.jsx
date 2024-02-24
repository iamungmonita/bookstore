
import Link from "next/link"
import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
const sign_in = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        })
        router.push('/admin')

    }
    return (
        <form className='flex flex-col gap-5 border-slate-300 border p-5 w-[450px] mx-auto absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' onSubmit={handleSubmit}>
            <div className='text-center space-y-5'>
                <h1 className='text-2xl font-bold'>SIGN IN</h1>

            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex flex-col gap-2'>
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <input
                        type="text"
                        name='email'
                        className='bg-slate-200 py-2 px-5 outline-none'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className="font-semibold" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        className='bg-slate-200 py-2 px-5 outline-none'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className='text-red-500'>{errorMsg}</p>
                <button className='bg-slate-300/50 hover:bg-slate-400 w-full py-2 hover:font-semibold' type='submit'>Submit</button>
            </div>
            <Link href={'/'}><h2 className="hover:font-semibold text-center">Forget Password?</h2></Link>
        </form>
    )
}
export default sign_in