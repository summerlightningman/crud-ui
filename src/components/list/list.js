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

        this.deleteRecord = this.deleteRecord.bind(this);
        this.addRecord = this.addRecord.bind(this);
        this.editRecord = this.editRecord.bind(this);
    }


    async deleteRecord(id) {
        const result = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        if (result.ok)
            await this.getRecords();
    }

    async addRecord(body) {
        const result = await fetch(url, {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (result.ok)
            await this.getRecords();
    }

    async getRecords() {
        await fetch(url)
            .then(result =>
                result.json()
            ).then(list =>
                this.setState({
                    records: list
                })
            )
        this.render();
    }

    async editRecord(body, id, updateMethod) {
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


    showHints() {
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
                        ({_id: id, data: data}, index) =>
                            <ListItem
                                key={index}
                                id={id || '-1'}
                                data={data || Object()}
                                editMethod={this.editRecord}
                                deleteMethod={() => this.deleteRecord(id)}
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
