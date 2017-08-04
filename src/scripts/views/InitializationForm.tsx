import Cascade, { Component } from 'cascade';
import { Container, Section, Form, FormActions, FormContainer, Button } from 'cascade-components';

import NotificationState from '../implementations/states/NotificationState';

export interface IInitializationFormProps {
    notificationState: NotificationState;
}

export default class InitializationForm extends Component<IInitializationFormProps> {
    setSubscriptionAddress = (event: Event) => {
        this.props.notificationState.subscriptionAddress = (event.target as HTMLInputElement).value;
    }

    setNotificationAddress = (event: Event) => {
        this.props.notificationState.notificationAddress = (event.target as HTMLInputElement).value;
    }

    createSubscription = (event: Event) => {
        event.preventDefault();
        this.props.notificationState.initializePush();
    }

    render() {
        let { notificationState } = this.props;
        let {
            notificationAddress,
            subscriptionAddress
        } = notificationState;

        return (
            <Section title="Initialization">
                <Form>
                    <FormContainer title="Subscription Address">
                        <input type="text" class="input" value={subscriptionAddress} onchange={this.setSubscriptionAddress} />
                    </FormContainer>
                    <FormContainer title="Notification Address">
                        <input type="text" class="input" value={notificationAddress} onchange={this.setNotificationAddress} />
                    </FormContainer>
                    <FormActions>
                        <Button theme="primary" onclick={this.createSubscription}>Send</Button>
                    </FormActions>
                </Form>
            </Section>
        )
    }
}