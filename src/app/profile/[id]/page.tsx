"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function UserProfilePage({params}: any) {
  const router = useRouter()
  const [data,setData] = React.useState('nothing')
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout successfully")
      router.push('/login')
    } catch (error:any) {
      toast.error(error.message)
      console.log(error.message)
    }
  }
  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
  }
  return (
    <div>
        <h1>Profile</h1>
        <hr />
        <p>Profile page {params.id}</p>
        <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
        <button onClick={logout} className='bg-gray-700 px-5 py-2 text-gray-50'>LOGOUT</button>
        <button onClick={getUserDetails} className='bg-gray-700 px-5 py-2 text-gray-50'>GEt USER DETAIL</button>
    </div>
  )
}

export default UserProfilePage