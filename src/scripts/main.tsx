declare var cordova: any;

import config from './config/config';

import NotificationSystem from './applications/NotificationSystem';

// Polyfill
require('es6-promise').polyfill();
import 'whatwg-fetch';

let app = new NotificationSystem(config);
window['app'] = app;
window.onload = function () {
    function initialize() {
        app.initialize();
    }
    if (typeof cordova !== 'undefined') {
        document.addEventListener('deviceready', initialize, false);
    } else {
        initialize();
    }
};
