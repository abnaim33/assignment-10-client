import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './components/login/Login'



const ProtectedRoutes = ({ user }) => {

    return (
        <>{user.displayName ? <Outlet /> : <Login />}</>
    )
}

export default ProtectedRoutes