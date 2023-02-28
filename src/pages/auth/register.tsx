/**
 * @author Sebastian Pavel
 * ? Register page
 */

import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState("")

    const register = async (e: any) => {
        e.preventDefault()
        if ((password === repeat) && username && email) {
            setLoading(true)
            try {
                const {data} = await axios({
                    method: "POST",
                    url: "/api/auth/register",
                    data: {
                        username: username,
                        email: email,
                        password: password
                    }
                })
                setStatus('ok')
                setMessage(data.message)
                console.log(data);
                setLoading(false)
            } catch (err) {
                setStatus('nok')
                setLoading(false)
                setMessage(err.response.data.message)
                console.error(err)
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900 px-10">
            <Head>
                <title>Hi, let's register you!</title>
            </Head>
            <div className='p-10 bg-neutral-800 w-full md:w-1/2'>
                {
                    status === 'ok' || 'nok' ? <div className={`${status === "ok" ? 'text-lime-400' : 'text-red-500'} mb-10`}>{message}</div> : null
                }
                <form className=''>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="floating_firstname" id="floating_firstname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="floating_lastname" id="floating_lastname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_age" id="floating_age" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={repeat} onChange={(e) => setRepeat(e.target.value)} type="password" name="floating_age" id="floating_age" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat password</label>
                </div>
                <button onClick={(e) => register(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'Wait...' : 'Submit'}</button>
                <Link href={`/auth/login`}><button className="text-neutral-400 hover:text-neutral-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button></Link>
                </form>
            </div>
        </div>
    )
}

export default Register;