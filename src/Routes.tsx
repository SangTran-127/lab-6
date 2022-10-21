import React from 'react'
import { useRoutes } from 'react-router-dom'
import PrivateRoute from './hoc/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'


const Routes = () => {
    return useRoutes([
        {
            element: <PrivateRoute />,
            children: [
                {
                    path: '/',
                    element: <Dashboard />
                }
            ]
        },
        {
            path: '/login',
            element: <Login />
        }
    ])
}

export default Routes