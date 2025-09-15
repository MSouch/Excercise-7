import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollControl from './ScrollControl'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollControl />
    </div>
  )
}

export default Layout