import React from 'react';
import ListItem from "../list-item";
import ListItemAdd from "../list-item-add";
import {ListGroup, Button, Card, CardBody, Collapse} from 'reactstrap';
import {url} from '../../urls'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            hintShowed: false,
        }
        this.getRecords();

        this.delete = this.delete.bind(this);
        this.addRecord = this.addRecord.bind(this);
        this.toHtml = this.toHtml.bind(this);
        this.editRecord = this.editRecord.bind(this);
    }


    async delete(id) {
        const result = await fetch(`${url}/${id}`, {method: 'DELETE'})
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
        const result = await fetch(url);
        result.json()
            .then(list => this.setState(
                {
                    records: list
                })
            )
    }

    async editRecord(body, id, updateMethod) {
        const response = await fetch(`${url}/${id}`, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok){
            const data = await response.json();
            updateMethod(data.data)
        }



    }

    toHtml(record, index) {
        let data = 'data' in record ? record.data : Object();
        return <ListItem
            data={data}
            key={index}
            id={record['_id']}
            onEdit={this.editRecord}
            onDelete={this.delete}
        />
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
                    {this.state.records.map(this.toHtml)}
                    <ListItemAdd onAdd={this.addRecord} key={-1}/>
                </ListGroup>
                <hr/>
                {this.showHints()}
            </div>

        )
    }
}

export default List;
