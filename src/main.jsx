import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (!registration) {
                navigator.serviceWorker
                    .register('/firebase-messaging-sw.js', {
                        scope: '/firebase-cloud-messaging-push-scope',
                    })
                    .then()
                    .catch((error) => {
                        console.error(
                            'Service Worker registration failed:',
                            error
                        )
                    })
            } else {
                console.log('Service Worker already registered:', registration)
            }
        })
    })
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 60 * 1000,
            cacheTime: 60 * 60 * 1000,
            retry: 2,
        },
    },
})

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <App />
        </UserProvider>
    </QueryClientProvider>
)
