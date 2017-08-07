declare var cordova: any;

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
            let push = PushNotification.init({
                android: {
                    senderID: '77088182555'
                },
                ios: {
                    sound: true,
                    vibration: true,
                    badge: true
                },
                windows: {

                }
            });
            push.on('registration', function (data) {
                console.log('registration event: ' + data.registrationId);
                var oldRegId = localStorage.getItem('registrationId');
                if (oldRegId !== data.registrationId) {
                    localStorage.setItem('registrationId', data.registrationId);
                }
            });

            push.on('error', function (e) {
                console.log('push error : ' + e.message);
            });
            app['push'] = push;
            app.initialize();
        }, false);
    } else {
        app.initialize();
    }
};
