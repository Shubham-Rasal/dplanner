import React from 'react'
import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <div className="flex  h-screen">
     
        {props.children}
    </div>
  )
}

export default Layout
