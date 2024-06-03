import React from 'react'
import { Link } from 'react-router-dom'


const NotFoundePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center">
    <h1 className="text-9xl font-extrabold  text-gray-400">404</h1>
    <p className="text-2xl font-semibold text-gray-500 mt-4">Page Not Found</p>
    <p className="text-lg text-gray-400 mt-2">Sorry, we couldn't find the page you're looking for.</p>
    <Link to="/" className="mt-6 px-5 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300">
      Go to Home
    </Link>
  </div>
  )
}

export default NotFoundePage