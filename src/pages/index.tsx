/**
 * @author Sebastian Pavel
 */

import axios from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import { useAuthStore } from '../store/authStore';

type User = {
  email: String,
  confirmationToken: String,
  id: Number,
  profile: {
    firstName: String,
    lastName: String,
    age: Number
  },
  username: String,
  verified: Boolean
}

export const Home = (props) => {
const {connected: cookie} = props
const {userProfile, removeUser} = useAuthStore()
const [user, setUser] = useState<User>()
const [connected, setConnected] = useState(cookie)

useEffect(() => {
  setUser(userProfile)
}, [userProfile])

console.log(user, 'got user here');

const logout = async () => {
  removeUser()
  const data = axios({
    method: "GET",
    url: '/api/auth/logout'
  })
  console.log(data);
}

return (
<div className="p-10">
  {
    !user?.profile?.firstName && user && connected ? (
      <div className='flex items-center gap-4'> 
        <p>You do not have a profile created, would you like to do it?</p>
        <Link href={`/user/${user?.confirmationToken}/create`}><button className='bg-lime-400 p-2 rounded-md px-6 hover:shadow ease-in-out duration-300'>Yup</button></Link>
      </div>
      ) : <div>
        Hello {user?.profile?.firstName}
      </div>
  }
{
  !connected ? <Link href="/auth/login"><button className='p-4 bg-neutral-800 rounded-md m-4 text-white'>Login</button></Link> : <button onClick={() => {logout(), setConnected(false)}} className='p-4 bg-neutral-800 rounded-md m-4 text-white'>Logout</button>
}

</div>
)
}

export default Home;

export async function getServerSideProps(ctx: any) {
  const {req: { headers: {cookie} }} = ctx
  console.log(ctx.req.headers.cookie);
  

  return {
    props: {
      connected: cookie ? true : false
    }
  }
}