import React from 'react';
import ListItem from "../list-item";
import ListItemAdd from "../list-item-add";
import {Button, Card, CardBody, Collapse, ListGroup} from 'reactstrap';
import {url} from '../../urls'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            hintShowed: false,
        }

        this.getRecords();
    }

    addRecord = async (body) => {
        const result = await fetch(url, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (result.ok) {
            await this.getRecords();
            return await result.json()
        }
    }

    getRecords = async () => {
        await fetch(url)
            .then(result =>
                result.json()
            ).then(list =>
                this.setState({
                    records: list
                })
            )
    }

    editRecord = (id) => {
        return async (body, updateMethod) => {
            const result = await fetch(`${url}/${id}`, {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (result.ok) {
                const data = await result.json();
                updateMethod(data.data)
            }
        }
    }

    deleteRecord = (id) => {
        return async () => {
            const result = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            });
            if (result.ok)
                await this.getRecords();
        }
    }


    showHints = () => {
        const toggle = () => {
            this.setState({
                hintShowed: !this.state.hintShowed
            })
        }
        return (
            <div>
                <Button
                    color="primary"
                    outline
                    onClick={toggle}
                >
                    Как редактировать данные
                </Button>
                <Collapse isOpen={this.state.hintShowed}>
                    <Card>
                        <CardBody>
                            Для редактирования нажмите на иконку <i className="fa fa-trash"> </i>.
                            Затем введите данные в следующем виде (соблюдая пробелы между знаками "/"): <br/>
                            <b>Логин / E-Mail / password</b>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

    render() {
        return (
            <div>
                <ListGroup className="app-first">
                    {this.state.records.map(
                        (record, index) =>
                            <ListItem
                                key={index}
                                data={record['data'] || Object()}
                                editMethod={this.editRecord(record['_id'])}
                                deleteMethod={this.deleteRecord(record['_id'])}
                            />
                    )}
                    <ListItemAdd
                        addMethod={this.addRecord}
                        key={-1}
                    />
                </ListGroup>
                <hr/>
                {this.showHints()}
            </div>

        )
    }
}

export default List;
