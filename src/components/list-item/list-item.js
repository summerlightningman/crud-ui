import React from 'react'
import {Input, ListGroupItem, Badge} from 'reactstrap'
import './list-item.css'


class ListItem extends React.Component {

    constructor(props) {
        super(props);

        this.keys = Object.keys(props.data)
        this.values = Object.values(props.data);

        this.state = {
            editMode: false,
            value: this.values.join(' '),
            editValue: this.values.join(' / ')
        }

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
    }

    swapEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editValues: this.values.join(' / ')
        }));
    }

    save(event) {
        event.preventDefault();

        const [login, email, password] = this.state.editValue.split(' / ');

        const data = {
            data: {
                login,
                email,
                password
            }
        }
        const body = JSON.stringify(data);
        this.props.onEdit(body, this.props.id);
        this.swapEditMode();
    }

    edit(event) {
        this.setState({editValue: event.target.value});
    }

    render() {
        return (
            <ListGroupItem className="app-list-item d-flex justify-content-between">
                {
                    this.state.editMode ?
                        this.editForm() :
                        this.itemView()
                }
            </ListGroupItem>
        )
    }

    editForm = () => {
        return (
            <>
                <Input
                    type="text"
                    placeholder="Введите E-Mail и пароль через пробел"
                    onChange={this.edit}
                    value={this.state.editValue}
                />
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn-level-down btn-sm"
                        onClick={this.swapEditMode}
                    >
                        <i className="fa fa-level-down"> </i>
                    </button>
                    <button
                        className="btn-check btn-sm"
                        onClick={this.save}
                    >
                        <i className="fa fa-check"> </i>
                    </button>
                </div>
            </>
        )
    }


    itemView = () => {
        const text = this.keys.map((key, i) =>
            <>
                <Badge color="light" pill>{key}</Badge>{this.values[i]}{"\t"}
            </>)
        return (
            <>
                <span className="app-list-item-label">
                    {text}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn-edit btn-sm" onClick={this.swapEditMode}>
                        <i className="fa fa-edit"> </i>
                    </button>
                    <button className="btn-trash btn-sm" onClick={() => this.props.onDelete(this.props.id)}>
                        <i className="fa fa-trash-o"> </i>
                    </button>
                </div>
            </>
        )
    }
}


export default ListItem;
