import { Dashboard, Login } from '@mui/icons-material'
import React from 'react'
import { useAppSelector } from '../hooks'
import { UserSliceState } from '../store/slice/user.slice'
import { Navigate, Outlet } from 'react-router-dom'


function PrivateRoute() {
    const { auth } = useAppSelector<UserSliceState>(state => state.user)
    return (
        auth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute