declare var cordova: any;

import Cascade from 'cascade';

import PushNotification from './PushNotification';

import Layout from './views/Layout';

// Polyfill
require('es6-promise').polyfill();
import 'whatwg-fetch';

let address = "http://10.42.1.59:3000";

export default class App {
    pushNotification: PushNotification = new PushNotification(address);

    // Application Constructor
    initialize() {
        if (typeof cordova !== 'undefined') {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        } else {
            window.onload = () => {
                this.onDeviceReady();
            }
        }
    }

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady() {
        Cascade.render(document.getElementById('root'), <Layout />);
        this.receivedEvent('deviceready');
        this.pushNotification.initializePush();
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

    pushMessageToBackEnd(message: any) {
        return fetch(address + '/api/trigger-push-msg/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
    }
};

export function run() {
    return 'Application started...';
}

let app = new App();
app.initialize();
window['app'] = app;