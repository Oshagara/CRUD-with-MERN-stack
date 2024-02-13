import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { Link, Outlet, useLoaderData } from 'react-router-dom'

const UpdateUser = () => {
    const loadedUser = useLoaderData();
    const handleUpdateUser = event => {
        event.preventDefault();
    const form = event.target;
    // console.log(form);

    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;

    const updatedUser = { name, email, photoURL };
    fetch(`http://localhost:5000/users/${loadedUser._id}`, {
        method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        if(data.acknowledged === true){
            alert("User Updated Successfully!");
            form.reset();
           }
    })
    };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaUser className="mx-auto h-10 w-auto"/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Update User info Here
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleUpdateUser} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="input your name"
                required
                className="pl-3 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="input your email address"
                required
                className="pl-3 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo Url
              </label>
            </div>
            <div className="mt-2">
              <input
                id="photoURL"
                name="photoURL"
                type="text"
                placeholder="input your PhotoURL"
                required
                className="pl-3 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          want to make changes?
          <a
            href="#"
            className="font-semibold leading-6 text-green-900 hover:text-green-500"
          >
            Update
          </a>
        </p>
      </div>
    </div>
  )
}

export default UpdateUser