// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')
// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
self.addEventListener('notificationclick', function (event) {
    // Get the action that was clicked
    const action = event.action

    // Close the notification
    event.notification.close()

    // Handle different actions
    if (action === 'open_app') {
        // Open the app or focus the window
        event.waitUntil(
            clients
                .matchAll({ type: 'window', includeUncontrolled: true })
                .then(function (clientList) {
                    if (clientList.length > 0) {
                        // Focus an existing window if one is already open
                        return clientList[0].focus()
                    }
                    // If no window is open, open a new one
                    return clients.openWindow(
                        'https://frontend-test-wfj8.onrender.com'
                    )
                })
        )
    } else if (action === 'dismiss') {
        console.log('Notification dismissed by the user.')
    } else {
        // Handle default notification click (outside action buttons)
        event.waitUntil(
            clients.openWindow('https://frontend-test-wfj8.onrender.com/')
        )
    }
})

const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
}

firebase.initializeApp(defaultConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.data?.title
    const notificationOptions = {
        body: payload.data?.body,
        icon: '/browserLogo.png',
        badge: '/browserLogo.png',
        requireInteraction: true,
        actions: [
            { action: 'open_app', title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss' },
        ],
    }

    self.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then((clients) => {
            if (clients && clients.length) {
                clients.forEach((client) => {
                    client.postMessage({
                        type: 'BACKGROUND_NOTIFICATION',
                        hasNotification: true,
                    })
                })
            }
        })

    self.registration.showNotification(notificationTitle, notificationOptions)
})
