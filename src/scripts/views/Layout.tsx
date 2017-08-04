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
                <div class="app">
                    <h1>Apache Cordova</h1>
                    <div id="deviceready" class="blink">
                        <p class="event listening" style={ready ? 'display: none;' : ''}>Connecting to Device</p>
                        <p class="event received" style={ready ? 'display: block;' : ''}>Device is Ready</p>
                    </div>
                </div>
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