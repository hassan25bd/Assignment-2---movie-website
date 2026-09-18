import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
