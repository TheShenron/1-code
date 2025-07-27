import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    const handleNavigateDevice = () => {
        navigate('device')
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleNavigate}>Lgoin</button>
            <button onClick={handleNavigateDevice}>Device</button>

        </div>
    )
}

export default Dashboard