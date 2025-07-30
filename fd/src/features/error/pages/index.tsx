import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }
    return (
        <div>
            <h1>Route Not Found 404!</h1>
            <button onClick={handleNavigate}>Home</button>
        </div>
    )
}

export default NotFound