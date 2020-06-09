import React from 'react';
import ListItem from "../list-item";
import ListItemAdd from "../list-item-add";
import {ListGroup} from 'reactstrap';
import {url} from '../../urls'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
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
            this.getRecords();
            return await result.json()
        }
    }

    getRecords = () => {
        fetch(url)
            .then(result =>
                result.json()
            ).then(list =>
            this.setState({
                records: list
            })
        )
    }

    editRecord = (id) => {
        return async (data, updateComponent) => {
            const body = JSON.stringify(data);
            const result = await fetch(`${url}/${id}`, {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (result.ok)
                updateComponent(data.data)
        }
    }

    deleteRecord = (id) => {
        return async () => {
            const result = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            });
            if (result.ok)
                this.getRecords();
        }
    }

    render() {
        return (
            <React.Fragment>
                <ListGroup>
                    {this.state.records.map(
                        record =>
                            <ListItem
                                key={record['_id']}
                                data={record['data'] || Object()}
                                editMethod={this.editRecord(record['_id'])}
                                deleteMethod={this.deleteRecord(record['_id'])}
                            />
                    )}
                    <ListItemAdd
                        addMethod={this.addRecord}
                    />
                </ListGroup>
            </React.Fragment>
        )
    }
}

export default List;
