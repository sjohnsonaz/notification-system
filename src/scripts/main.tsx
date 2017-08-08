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
            /*
            fcmPlugin.onTokenRefresh((token) => {
                console.log(token);
            });

            fcmPlugin.onNotification((data) => {
                console.log(JSON.stringify(data));
            });
            let push = PushNotification.init({
                android: {
                    senderID: '77088182555'
                },
                ios: {
                    sound: true,
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

            push.on('notification', function (data) {
                console.log('notification event');
                var cards = document.getElementById("cards");
                var push = '<div class="row">' +
                    '<div class="col s12 m6">' +
                    '  <div class="card darken-1">' +
                    '    <div class="card-content black-text">' +
                    '      <span class="card-title black-text">' + data.title + '</span>' +
                    '      <p>' + data.message + '</p>' +
                    '      <p>' + data.additionalData.foreground + '</p>' +
                    '    </div>' +
                    '  </div>' +
                    ' </div>' +
                    '</div>';
                cards.innerHTML += push;
            });
            app['push'] = push;
            */
            app.initialize();
        }, false);
    } else {
        app.initialize();
    }
};
