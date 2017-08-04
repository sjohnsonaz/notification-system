import { CrudConnection } from 'cascade-manager';

import { ISubscriptionConnection } from '../../interfaces/connections/ISubscriptionConnection';

export default class SubscriptionConnection extends CrudConnection<string, PushSubscription, {}> implements ISubscriptionConnection {
    constructor(base: string, route: string = 'Subscription') {
        super(base, route);
    }
}