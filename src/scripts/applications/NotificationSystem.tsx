import Cascade, { observable } from 'cascade';

import { IConfig } from '../interfaces/data/IConfig';

import NotificationState from '../implementations/states/NotificationState';

import NotificationConnection from '../implementations/connections/NotificationConnection';
import SubscriptionConnection from '../implementations/connections/SubscriptionConnection';

import Layout from '../views/Layout';

export default class App {
    notificationState: NotificationState;
    @observable ready: boolean = false;
    @observable index: number = 0;

    constructor(config: IConfig) {
        this.notificationState = new NotificationState(
            new NotificationConnection(''),
            new SubscriptionConnection('')
        );
        this.notificationState.notificationAddress = config.notificationAddress;
        this.notificationState.subscriptionAddress = config.subscriptionAddress;
    }

    // Application Constructor
    initialize() {
        Cascade.render(
            document.getElementById('root'),
            <Layout
                notificationSystem={this}
            />
        );
        this.ready = true;
    }
};