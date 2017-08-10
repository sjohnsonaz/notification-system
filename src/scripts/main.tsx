declare var cordova: any;
declare var FirebasePlugin: any;

import config from './config/config';

import NotificationSystem from './applications/NotificationSystem';

// Polyfill
require('es6-promise').polyfill();
import 'whatwg-fetch';

let app = new NotificationSystem(config);
window['app'] = app;

window.onload = function () {
    if (typeof cordova !== 'undefined') {
        document.addEventListener('deviceready', function initialize() {
            initializePushPlugin();
            app.initialize();
        }, false);
    } else {
        app.initialize();
    }
};

function initializePushPlugin() {
    FirebasePlugin.getToken(function (token) {
        // save this server-side and use it to push notifications to this device
        console.log(token);
    }, function (error) {
        console.error(error);
    });
    FirebasePlugin.onTokenRefresh(function (token) {
        // save this server-side and use it to push notifications to this device
        console.log(token);
    }, function (error) {
        console.error(error);
    });
    FirebasePlugin.onNotificationOpen(function (notification) {
        console.log(notification);
    }, function (error) {
        console.error(error);
    });
}