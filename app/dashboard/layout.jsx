import React from 'react'
import HeaderPage from './_components/Header'
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <HeaderPage />
      <div className="mx-5 md:mx-20 lg:mx-36">
        {children}

      </div>
    </div>
  )
}

export default DashboardLayout