import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { validateChangePassword } from '../hooks/formValidation'
import { useState } from 'react'
import { resetUserPassword } from '../services/authApi'
import { useUser } from '../contexts/UserContext'

export default function useChangeUserPassword() {
    const navigate = useNavigate()
    const { username } = useParams()
    const [password, setPassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const { state: user } = useUser()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateChangePassword({
            password,
            confirmPassword,
        })

        if (Object.keys(validationErrors).length === 0) {
            setisLoading(true)

            const response = await resetUserPassword(
                username,
                password,
                user.accessToken
            )
            if (response && response.status === 200) {
                toast.success(
                    `${'بنجاح'}  ${` ${username}`}  ${' لقد تم تغيير كلمة مرور  '}`,
                    {
                        style: {
                            fontSize: 16,
                            color: 'white',
                            background: 'rgb(88 28 135 / 0.9)',
                            borderRadius: 25,
                            fontWeight: 500,
                        },
                        iconTheme: {
                            primary: '#FFFAEE',
                            secondary: 'rgb(88 28 135 / 0.9) ',
                        },
                        duration: 5000,
                        position: 'bottom-right',
                    }
                )
                setisLoading(false)
                navigate('/admin/users', { replace: true })
            }
        } else {
            setisLoading(false)
            setErrors(validationErrors)
        }
    }
    return {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        username,
        navigate,
        isLoading,
        handleSubmit,
    }
}
