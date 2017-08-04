import { IConnection } from 'cascade-manager';

import { IPushNotification } from '../data/IPushNotification';
export interface INotificationConnection extends IConnection {
    post(pushNotification: IPushNotification): Promise<(boolean | Error)[]>;
}