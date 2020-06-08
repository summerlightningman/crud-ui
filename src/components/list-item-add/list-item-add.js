import React from 'react';
import {Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert, Container, Col, Row} from 'reactstrap'


class ListItemAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
            hasInputError: false
        }
    }

    edit(field, event) {
        this.setState({
            [field]: event.target.value
        })
    }


    submit(event) {
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
        console.log(body);
        this.props.onAdd(body);
        this.clearFields();
    }

    showErrorMessages() {
        if (this.state.hasInputError) {
            return <Alert color="danger">
                Неверный формат ввода
            </Alert>
        } else {
            return false;
        }
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
                <form onSubmit={e => this.submit(e)}>
                    <Container fluid={true}>
                        <Row>
                            <Col xs="2" sm="3" md="3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Логин</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={e => this.edit('login', e)}
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
                                        onChange={e => this.edit('email', e)}
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
                                        onChange={e => this.edit('password', e)}
                                        value={this.state.password}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs="1" sm="3" md="3">
                                <Button
                                    type="submit"
                                    outline
                                    color="secondary"
                                >Добавить</Button>
                            </Col>
                        </Row>
                    </Container>
                </form>
                {this.showErrorMessages()}
            </div>
        )
    }
}

export default ListItemAdd;
