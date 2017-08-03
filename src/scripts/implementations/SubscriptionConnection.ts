import { Connection } from 'cascade-manager';

import { ISubscriptionConnection } from '../interfaces/connections/ISubscriptionConnection';

export default class SubscriptionConnection extends Connection implements ISubscriptionConnection {
    constructor(base: string, route: string = 'Subscription') {
        super(base, route);
    }

    post(pushSubscription: PushSubscription) {
        this.call(this.base, {
            method: 'POST',
            body: JSON.stringify(pushSubscription),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}