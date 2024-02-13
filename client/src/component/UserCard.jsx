import React, { useState } from 'react'
import { Link, Outlet, useLoaderData } from 'react-router-dom'

const UserCard = () => {
    const loadedUser = useLoaderData();
    const [users, setUsers] = useState(loadedUser);

    const handleDelete = (_id) =>{
        // console.log(id)
        fetch(`http://localhost:5000/users/${_id}`,{
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            const filter = users.filter(user => user._id != _id);
            setUsers(filter);
           if(data.acknowledged === true){
            alert("User deleted Successfully!"); 
           }
        })
    }
  return (
    <div>
    <h2>All available user: {users.length}</h2>
    <div className="flex flex-wrap gap-4">
    {
        users.map((user) => 
        <div key={user._id} className="max-w-2xl sm:max-w-sm md:max-w-sm lg:max-w-xs xl:max-w-xs sm:mx-auto md:mx-4 lg:mx-auto gap-8 mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-45"
              src={user.photoURL}
              alt="Man looking front"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.occupation}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="flex flex-wrap gap-2 p-4 border-t mx-8 mt-2">
          <Link to={`/UpdateUser/${user._id}`} className="w-1/3 mx-auto rounded-md bg-green-900 hover:shadow-lg font-semibold text-white px-2 py-1.5"> <button>
              Update
            </button></Link>
            <button onClick={() => handleDelete(user._id)} className="w-1/3 mx-auto rounded-md bg-red-900 hover:shadow-lg font-semibold text-white p-2">
              Remove
            </button>
          </div>
        </div>
        )
    }
 </div> </div>
 );
};

export default UserCard