import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
         <nav className="flex justify-between border-b-2 py-4 mb-5">
            <a href="/"><span className="font-semibold font text-2xl">~DEV PROFILE</span></a>
            <Link to='/AddUser' className="hover:bg-green-800 hover:text-white p-2 hover:animate-pulse">Add new user</Link>
        </nav>
    </div>
  )
}

export default NavBar