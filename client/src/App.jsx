import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './component/NavBar'

const App = () => {
  return (
   <div className="max-w-7xl mx-auto px-12">
    <NavBar/>
    <Outlet/>
   </div>
  )
}

export default App
