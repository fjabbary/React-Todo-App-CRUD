import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

export default class TodoList extends Component {

    state = {
        todos: [],
        alertMsg: ''
    }

    componentDidMount() {
        this.readFromLocalStorage();
    }

    readFromLocalStorage() {
        const todos = JSON.parse(localStorage.getItem('todos'))
        if (todos) {
            this.setState({ todos })
        }
    }

    addToLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    handleAddFn = (newTodo) => {
        const foundTodo = this.state.todos.find(todo => newTodo.todo === todo.todoText)
        const newTodoObj = { id: uuidv4(), todoText: newTodo.todo, isCompleted: false }

        if (foundTodo) {
            this.setState({ alertMsg: 'This task already exists' })
        } else {
            this.setState(prevState => ({
                todos: [...prevState.todos, newTodoObj],
                alertMsg: ''
            }), () => {
                this.addToLocalStorage()
            })
        }
    }

    handleRemoveFn = (todoId, e) => {
        e.stopPropagation();
        const filteredTodos = this.state.todos.filter(todo => todo.id !== todoId);
        this.setState({ todos: filteredTodos }, () => {
            this.addToLocalStorage();
        })
    }

    handleToggleFn = (todoId) => {
        const newTodos = this.state.todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, isCompleted: !todo.isCompleted }
            }
            return todo;
        })
        this.setState({ todos: newTodos }, () => {
            this.addToLocalStorage()
        });
    }

    handleUndoneTodos = () => {
        return this.state.todos.filter(todo => todo.isCompleted === false).length
    }

    handleChangeFn = (todoId, newText) => {
        const newTodos = this.state.todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, todoText: newText };
            }
            return todo;
        })
        this.setState({ todos: newTodos }, () => {
            this.addToLocalStorage()
        });
    }

    render() {
        const { todos, alertMsg } = this.state;
        const todoItemJSX = todos.map(todo => <TodoItem todo={todo} key={todo.id} handleRemove={this.handleRemoveFn} handleToggle={this.handleToggleFn} handleChange={this.handleChangeFn} />)
        return (
            <div className="todoList">
                <div className="todo-title">
                    <h1>Todo List!</h1>
                    <p><small>A Simple React Todo List App.</small></p>

                    <h4> <u>{this.handleUndoneTodos()}</u> tasks to do</h4>
                </div>

                {todos.length > 0 ? <div className="todoItem-container">
                    {todoItemJSX}
                </div> : <h2 style={{ margin: '30px' }}>No todos to display</h2>}
                <TodoForm handleAdd={this.handleAddFn} />
                <div className="danger">{alertMsg}</div>
            </div>
        )
    }
}
