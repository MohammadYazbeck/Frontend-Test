/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export default function ProtectedRoute({ children }) {
    const { state } = useUser()
    return <>{state && state.Authenticated ? children : <Navigate to="/" />}</>
}
