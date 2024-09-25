import { Suspense, lazy } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'
import ProtectedRoute from './ui/ProtectedRoute'
import Loader from './ui/Loader'
import AdminAppLayout from './layouts/AdminAppLayout'

const PendingRequests = lazy(() => import('./pages/PendingRequests'))
const Archive = lazy(() => import('./pages/Archive'))
const RequestDetails = lazy(() => import('./pages/RequestDetails'))
const UsersAccounts = lazy(() => import('./pages/UsersAccounts'))
const ChangeUserPassword = lazy(() => import('./pages/ChangeUserPassword'))
const DeleteDatabase = lazy(() => import('./pages/DeleteDatabase'))

function App() {
    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="login" />} />
                    <Route path="login" element={<Login />} />
                </Route>

                {/* Admin Dashboard with lazy loading */}
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute>
                            <AdminAppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={<Navigate replace to="pending-requests" />}
                    />

                    {/* Pending Requests */}
                    <Route
                        path="pending-requests"
                        element={
                            <Suspense fallback={<Loader />}>
                                <PendingRequests />
                            </Suspense>
                        }
                    />
                    <Route
                        path="pending-requests/request"
                        element={
                            <Suspense fallback={<Loader />}>
                                <RequestDetails />
                            </Suspense>
                        }
                    />

                    {/* Archive */}
                    <Route
                        path="archive"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Archive />
                            </Suspense>
                        }
                    />
                    <Route
                        path="archive/request"
                        element={
                            <Suspense fallback={<Loader />}>
                                <RequestDetails />
                            </Suspense>
                        }
                    />

                    {/* Users */}
                    <Route
                        path="users"
                        element={
                            <Suspense fallback={<Loader />}>
                                <UsersAccounts />
                            </Suspense>
                        }
                    />
                    <Route
                        path="users/change-password/:username"
                        element={
                            <Suspense fallback={<Loader />}>
                                <ChangeUserPassword />
                            </Suspense>
                        }
                    />

                    {/* Delete Database */}
                    <Route
                        path="delete-all-requests"
                        element={
                            <Suspense fallback={<Loader />}>
                                <DeleteDatabase />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
