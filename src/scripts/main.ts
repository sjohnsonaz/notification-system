export default class App {
    // Application Constructor
    initialize() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady() {
        this.receivedEvent('deviceready');
        this.registerServiceWorker();
    }

    // Update DOM on a Received Event
    receivedEvent(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            return navigator.serviceWorker.register('bundle/ServiceWorker.js')
                .then(function (registration) {
                    console.log('Service worker successfully registered.');
                    return registration;
                })
                .catch(function (err) {
                    console.error('Unable to register service worker.', err);
                });
        }
    }
};

export function run() {
    return 'Application started...';
}

let app = new App();
app.initialize();