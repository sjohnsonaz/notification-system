import Cascade, { Component } from 'cascade';
import { Container, Tab } from 'cascade-components';

import NotificationSystem from '../applications/NotificationSystem';

import InitializationForm from './InitializationForm';
import MessageForm from './MessageForm';

export interface ILayoutProps {
    notificationSystem: NotificationSystem;
}

export default class Layout extends Component<ILayoutProps> {
    setSubscriptionAddress = (subscriptionAddress: string) => {
        this.props.notificationSystem
    }

    setNotificationAddress = (notificationAddress: string) => {

    }

    setIndex = (index: number) => {
        this.props.notificationSystem.index = index;
    }
    render() {
        let { notificationSystem } = this.props;
        let {
            notificationState,
            ready
        } = notificationSystem;

        return (
            <Container>
                <h1>Notification System</h1>
                <div>
                    {ready ? 'Device is Ready' : 'Connecting to Device'}
                </div>
                <hr />
                <Tab
                    titles={[
                        'Initialization',
                        'Messages'
                    ]}
                    activeIndex={notificationSystem.index}
                    onSelectPanel={this.setIndex}
                    animated
                >
                    <InitializationForm notificationState={notificationState} />
                    <MessageForm notificationState={notificationState} />
                </Tab>
            </Container>
        )
    }
}