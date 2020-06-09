import React from 'react';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap'


class ListItemAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
        }
    }

    typeText = (field, event) => {
        this.setState({
            [field]: event.target.value
        })
    }


    addRecord(event) {
        if (event)
            event.preventDefault();
        const {login, password, email} = this.state;
        const data = {
            data: {
                login,
                email,
                password,
            }
        }
        const body = JSON.stringify(data);
        this.props.addMethod(body);
        this.clearFields();
    }

    clearFields() {
        this.setState(
            {
                email: '',
                login: '',
                password: ''
            }
        )
    }


    render() {
        return (
            <div>
                <form onSubmit={e => this.addRecord(e)}>
                    <Container fluid={true}>
                        <Row>
                            <Col xs="2" sm="3" md="3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Логин</InputGroupText>
                                    </InputGroupAddon>

                                    <Input
                                        onChange={e => this.typeText('login', e)}
                                        value={this.state.login}
                                    />
                                </InputGroup>
                            </Col>

                            <Col xs="2" sm="3" md="3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>E-Mail</InputGroupText>
                                    </InputGroupAddon>

                                    <Input
                                        onChange={e => this.typeText('email', e)}
                                        value={this.state.email}
                                    />
                                </InputGroup>
                            </Col>

                            <Col xs="2" sm="3" md="3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Пароль</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={e => this.typeText('password', e)}
                                        value={this.state.password}
                                    />
                                </InputGroup>
                            </Col>

                            <Col xs="1" sm="3" md="3">
                                <Button
                                    type="submit"
                                    outline
                                    color="secondary"
                                >
                                    Добавить
                                </Button>
                            </Col>

                        </Row>
                    </Container>
                </form>
            </div>
        )
    }
}

export default ListItemAdd;
