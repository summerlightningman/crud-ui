import React from 'react'
import {Input, ListGroupItem, Badge} from 'reactstrap'
import './list-item.css'


class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            data: props.data,
            editData: props.data
        }
    }

    updateComponent = (data) => {
        this.setState({
            data: data,
            editValue: Object.values(data).join(' / ')
        })
    }

    swapEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
        }));
    }

    editRecord = (event) => {
        event.preventDefault();

        const data = {
            data: this.state.editData
        }

        this.props.editMethod(data, this.updateComponent);
        this.swapEditMode();
    }

    deleteRecord = () => {
        this.props.deleteMethod();
    }

    render() {
        return (
            <ListGroupItem className="app-list-item d-flex justify-content-between">
                {this.state.editMode ? this.editForm() : this.itemView()}
            </ListGroupItem>
        )
    }

    editForm = () => {
        const inputs = Object.entries(this.state.data).map(
            ([key, value], index) =>
                <div key={index}>
                    <Badge color="light" pill>
                        {key}
                    </Badge>
                    <Input
                        type="text"
                        placeholder={`Введите поле ${key}`}
                        onChange={this.typeText(key)}
                        value={this.state.editData[key]}
                    />
                </div>
        );
        return (
            <React.Fragment>
                {inputs}
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
            </React.Fragment>
        )
    }

    itemView = () => {
        const text = Object.entries(this.state.data).map(
            ([key, value], index) =>
                <React.Fragment key={index}>
                    <Badge color="light" pill>
                        {key}
                    </Badge>
                    {value}
                </React.Fragment>
        );
        return (
            <React.Fragment>
                <span className="app-list-item-label">
                    {text}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn-edit btn-sm"
                        onClick={this.swapEditMode}
                    >
                        <i className="fa fa-edit"> </i>
                    </button>
                    <button
                        className="btn-trash btn-sm"
                        onClick={this.deleteRecord}
                    >
                        <i className="fa fa-trash-o"> </i>
                    </button>
                </div>
            </React.Fragment>
        )
    }

    typeText = (key) => {
        return (event) => {
            const field = {[key]: event.target.value}
            this.setState(state => ({
                editData: Object.assign(state.editData, field)
            }));
        }

    }
}


export default ListItem;
