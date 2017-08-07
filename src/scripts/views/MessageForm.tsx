import Cascade, { Component } from 'cascade';
import { Container, Form, FormActions, FormContainer, Button } from 'cascade-components';

import NotificationState from '../implementations/states/NotificationState';

export interface IMessageFormProps {
    notificationState: NotificationState;
}

export default class MessageForm extends Component<IMessageFormProps> {
    setMessage = (event: Event) => {
        this.props.notificationState.message = (event.target as HTMLInputElement).value;
    }

    sendMessage = (event: Event) => {
        event.preventDefault();
        this.props.notificationState.sendMessage();
    }

    render() {
        let { notificationState } = this.props;
        let {
            message
        } = notificationState;

        return (
            <Form>
                <FormContainer title="Message">
                    <input type="text" class="input" value={message} onchange={this.setMessage} />
                </FormContainer>
                <FormActions>
                    <Button theme="primary" onclick={this.sendMessage}>Send</Button>
                </FormActions>
            </Form>
        )
    }
}