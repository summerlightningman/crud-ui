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
            <form onSubmit={e => this.addRecord(e)} style={{marginTop: '10px'}}>
                <Row>
                    <Col>
                        <Input
                            placeholder="Логин"
                            onChange={e => this.typeText('login', e)}
                            value={this.state.login}
                        />
                    </Col>

                    <Col>
                        <Input
                            placeholder="E-Mail"
                            onChange={e => this.typeText('email', e)}
                            value={this.state.email}
                        />
                    </Col>

                    <Col>
                        <Input
                            placeholder="Пароль"
                            onChange={e => this.typeText('password', e)}
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
