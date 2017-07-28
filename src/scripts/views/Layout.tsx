import Cascade, { Component } from 'cascade';
import { Container, Section, Form, FormActions, FormContainer, Button } from 'cascade-components';

export interface ILayoutProps {

}

export default class Layout extends Component<ILayoutProps> {
    render() {
        return (
            <Container>
                <div class="app">
                    <h1>Apache Cordova</h1>
                    <div id="deviceready" class="blink">
                        <p class="event listening">Connecting to Device</p>
                        <p class="event received">Device is Ready</p>
                    </div>
                </div>
                <Section title="Application">
                    <Form>
                        <FormContainer title="Message">
                            <input type="text" class="input" />
                        </FormContainer>
                        <FormActions>
                            <Button theme="primary">Send</Button>
                        </FormActions>
                    </Form>
                </Section>
            </Container>
        )
    }
}