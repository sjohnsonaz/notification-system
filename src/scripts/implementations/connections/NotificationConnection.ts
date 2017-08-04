import { Connection } from 'cascade-manager';

import { INotificationConnection } from '../../interfaces/connections/INotificationConnection';
import { IPushNotification } from '../../interfaces/data/IPushNotification';
export default class NotificationConnection extends Connection implements INotificationConnection {
    post(pushNotification: IPushNotification): Promise<(boolean | Error)[]> {
        return this.call(this.base, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pushNotification)
        });
    }
}