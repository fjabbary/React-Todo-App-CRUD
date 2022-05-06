import React, { Component } from 'react'

export default class TodoForm extends Component {

    state = {
        todo: ''
    }

    handleChange = (e) => {
        this.setState({
            todo: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleAdd(this.state)
        this.setState({ todo: '' })
    }

    render() {
        return (
            <div className="todoForm">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">New Todo</label><br />
                    <div className="form-control">
                        <input id="new-todo" type="text" name="new-todo" className="input" placeholder="New Todo" value={this.state.todo} onChange={this.handleChange} />
                        <button>ADD TODO</button>
                    </div>
                </form>
            </div>
        )
    }
}
