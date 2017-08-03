let address = "http://10.42.1.59:3000";

export default class PushNotification {
    address: string;

    constructor(address: string) {
        this.address = address;
    }

    // Application Constructor
    initialize() {
        this.initializePush();
    }

    async initializePush() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                let notificationPermission = await this.askPermission();
                if (notificationPermission !== 'granted') {
                    throw new Error('We weren\'t granted permission.');
                }
                let serviceWorkerRegistration = await this.registerServiceWorker();
                console.log('Service worker successfully registered.');
                let pushSubscription = await this.subscribeUserToPush(serviceWorkerRegistration);
                console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                let response = await this.sendSubscriptionToBackEnd(pushSubscription);
                if (!response.ok) {
                    throw new Error('Bad status code from server.');
                }
                let responseData = await response.json();
                if (!(responseData.data && responseData.data.success)) {
                    throw new Error('Bad response from server.');
                }
                return true;
            } catch (e) {
                console.error('Unable to register service worker.', e);
            }
        }
    }

    registerServiceWorker() {
        return navigator.serviceWorker.register('bundle/ServiceWorker.js');
    }

    askPermission() {
        return new Promise<NotificationPermission>(function (resolve, reject) {
            const permissionResult = Notification.requestPermission(function (result) {
                resolve(result);
            });
            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
    }

    subscribeUserToPush(serviceWorkerRegistration: ServiceWorkerRegistration) {
        const subscribeOptions: PushSubscriptionOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BFycNS1Ah5TUoHY-9pHWfsriqqsiyC2ZKcy8eMVkKdG5h2Ayi4Bnd6mgzBI02_Do7aH2HFVBtuNfag_WVaHtXx8'
            ) as any
        };
        return serviceWorkerRegistration.pushManager.subscribe(subscribeOptions);
    }

    sendSubscriptionToBackEnd(subscription: PushSubscription) {
        return fetch(address + '/api/save-subscription/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
        });
    }
};

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}