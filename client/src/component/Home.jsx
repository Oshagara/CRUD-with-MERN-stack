import React from 'react'
import UserCard from './UserCard';
import { useLoaderData } from 'react-router-dom';


const Home = () => {
    const loadedUser = useLoaderData();
  return (
    <div>
      <UserCard/>
    </div>
  );
}

export default Home