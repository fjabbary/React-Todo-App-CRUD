import React, { Component } from 'react'

export default class TodoItem extends Component {

    state = {
        isEditing: false,
        editText: ''
    }

    hanldeEditChild = (e) => {
        e.stopPropagation();
        this.setState({ isEditing: true, editText: e.target.parentElement.previousSibling.innerText })
    }

    handleSave = () => {
        this.setState({ isEditing: false })
    }

    handleChangeChild = (todoId, e) => {
        this.props.handleChange(todoId, e.target.value)
        this.setState({ editText: e.target.value })
    }

    render() {
        const { todo, handleRemove, handleToggle } = this.props;
        return (
            <React.Fragment>
                {!this.state.isEditing ?
                    <div className="todoItem" onClick={handleToggle.bind(this, todo.id)}>
                        <div className={todo.isCompleted ? "completed" : ""}>{todo.todoText}</div>
                        <div>
                            <div className="fa fa-pen" onClick={this.hanldeEditChild}></div>
                            <div className="fa fa-trash" onClick={handleRemove.bind(this, todo.id)}></div>
                        </div>
                    </div>
                    :
                    <div>
                        <input type="text" className="input-edit" value={this.state.editText} name="input-edit" onChange={this.handleChangeChild.bind(this, todo.id)} />
                        <button className="btn-save" onClick={this.handleSave}>SAVE</button>
                    </div>}

            </React.Fragment>
        )
    }
}
