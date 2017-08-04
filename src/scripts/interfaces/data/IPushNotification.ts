import { INotification } from './INotification';

export interface IPushNotification {
    notification: INotification;
    subscriptions: PushSubscription[];
}