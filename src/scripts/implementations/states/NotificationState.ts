import Cascade, { observable } from 'cascade';

import { INotificationConnection } from '../../interfaces/connections/INotificationConnection';
import { ISubscriptionConnection } from '../../interfaces/connections/ISubscriptionConnection';

export default class PushNotification {
    notificationConnection: INotificationConnection;
    subscriptionConnection: ISubscriptionConnection;
    @observable subscriptionAddress: string;
    @observable notificationAddress: string;
    @observable message: string;

    constructor(
        notificationConnection: INotificationConnection,
        subscriptionConnection: ISubscriptionConnection
    ) {
        this.notificationConnection = notificationConnection;
        this.subscriptionConnection = subscriptionConnection;

        Cascade.subscribe<string>(this, 'subscriptionAddress', (value) => {
            this.subscriptionConnection.base = value;
        });

        Cascade.subscribe<string>(this, 'notificationAddress', (value) => {
            this.notificationConnection.base = value;
        });
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
                return await this.sendSubscriptionToBackEnd(pushSubscription);
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
        return this.subscriptionConnection.post(subscription);
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