import { useRouter } from 'next/router'
import React, { useState } from 'react'

const register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    // const [cfpassword, setCfPassword] = useState('')
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/auth/admin_register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then((data) => {
            if (data.admin) {
                router.push('/admin')
            }
            if (data.error) {
                setUsernameError(data.error.username)
                setEmailError(data.error.email)
                setPasswordError(data.error.password)
            }
        }).catch(err => console.log(err))
    }

    return (
        <form action=""
            onSubmit={handleSubmit}
            className='flex flex-col max-w-[400px] mx-auto mt-10 p-5 border bg-slate-50'
        >
            <h2 className='text-2xl font-semibold text-center'>Register</h2>
            <label className="mt-5 font-semibold" htmlFor="username">Username</label>
            <input type="text" name='username' className='px-5 py-3 mt-3 bg-slate-200' onChange={(e) => setUsername(e.target.value)} required />
            <div>{usernameError}</div>
            <label className="mt-5 font-semibold" htmlFor="email">Email</label>
            <input type="email" name='email' className='px-5 py-3 mt-3 bg-slate-200' onChange={(e) => setEmail(e.target.value)} required />
            <div>{emailError}</div>
            <label className="mt-5 font-semibold" htmlFor="password">Password</label>
            <input type="password" name='password' className='px-5 py-3 mt-3 bg-slate-200' onChange={(e) => setPassword(e.target.value)} required />
            <div>{passwordError}</div>
            {/* <label className="mt-5 font-semibold" htmlFor="cfpassword">Confirm Password</label>
            <input type="password" name='cfpassword' className='px-5 py-3 mt-3 bg-slate-200' onChange={(e) => setCfPassword(e.target.value)} /> */}
            <input type="submit" value="Submit" className='w-full py-3 px-5 bg-slate-300 mt-10' />
        </form>
    )
}

export default register