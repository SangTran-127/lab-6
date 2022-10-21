import React from 'react'
import Header from '../components/Header'
import ProfileShow from '../components/ProfileShow'
interface DashboardProps { }

const Dashboard = (props: DashboardProps) => {
    return (
        <>
            <Header />
            <ProfileShow />
        </>
    )
}

export default Dashboard