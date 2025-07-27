import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/dashboard')
    }
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleNavigate}>Dashboard</button>
        </div>
    )
}

export default Login