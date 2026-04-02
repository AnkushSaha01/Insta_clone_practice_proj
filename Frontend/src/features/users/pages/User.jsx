import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'

const User = () => {
    const {handleGetCurrentUser} = useUser()
    const [user, setUser] = useState(null)
    useEffect(() => {
        handleGetCurrentUser().then((data) => {
            setUser(data)
        })
    }, [])
  return (
    <div className='flex items-start gap-2 mt-4'>
        <img className='w-10 h-10 rounded-full' src={user?.profilePicture} alt="" />
        <div className='flex flex-col'>
            <h2 className=' font-medium'>{user?.username}</h2>
            <p className='text-xs text-gray-500'>{user?.fullname}</p>
        </div>
    </div>
  )
}

export default User