import React from 'react';
import {Button, Col, Input, Row} from 'reactstrap'


class ListItemAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
        }
    }

    typeText = (field) => {
        return (event) =>
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
            <form onSubmit={e => this.addRecord(e)} style={{marginTop: '10px'}}>
                <Row>
                    <Col>
                        <Input
                            placeholder="Логин"
                            onChange={this.typeText('login')}
                            value={this.state.login}
                        />
                    </Col>

                    <Col>
                        <Input
                            placeholder="E-Mail"
                            onChange={this.typeText('email')}
                            value={this.state.email}
                        />
                    </Col>

                    <Col>
                        <Input
                            placeholder="Пароль"
                            onChange={this.typeText('password')}
                            value={this.state.password}
                        />
                    </Col>

                    <Col xs={2}>
                        <Button
                            type="submit"
                            outline
                            color="secondary"
                        >
                            Добавить
                        </Button>
                    </Col>

                </Row>
            </form>

        )
    }
}

export default ListItemAdd;
