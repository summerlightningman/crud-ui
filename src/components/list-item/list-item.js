import React from 'react'
import {Input, ListGroupItem, Badge} from 'reactstrap'
import './list-item.css'


class ListItem extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            editMode: false,
            data: props.data,
            editValue: Object.values(props.data).join(' / ')
        }
        this.typeText = this.typeText.bind(this);
        this.updateData = this.updateData.bind(this)
        this.editRecord = this.editRecord.bind(this);

    }

    swapEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
        }));
    }

    editRecord(event) {
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
        this.props.onEdit(body, this.props.id, this.updateData);
        this.swapEditMode();
    }

    typeText(event) {
        this.setState({
            editValue: event.target.value
        });
    }

    updateData(data) {
        console.log(data);
        this.setState({
            data: data,
            editValue: Object.values(data).join(' / ')
        })
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
                    onChange={this.typeText}
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
                        onClick={this.editRecord}
                    >
                        <i className="fa fa-check"> </i>
                    </button>
                </div>
            </>
        )
    }


    itemView = () => {
        const text = Object.entries(this.state.data).map(
            ([key, value]) =>
                <><Badge color="light" pill>{key}</Badge>{value}</>
        );
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
