interface Window {
    registration: any;
}

self.addEventListener('push', function (event: MessageEvent) {
    let message = '';
    if (event.data) {
        message = event.data.json().message;
    }
    if (message) {
        console.log('Message: ', message);
    } else {
        console.log('This push event has no data.');
    }

    const promiseChain = self.registration.showNotification(message);
    (event as any).waitUntil(promiseChain);
});