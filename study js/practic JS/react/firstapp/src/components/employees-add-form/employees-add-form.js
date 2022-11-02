// import React from "react";
import { Component } from 'react';
// import nextId from "react-id-generator";
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // formValidation = (name, salary) => {
    //     if (this.state.name.length > 3 && this.state.salary.length > 2) {
    //         this.props.onAdd(name, salary)
    //         this.setState({
    //             name: '',
    //             salary: ''
    //         })
    //     }
    // }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length > 3 && this.state.salary.length > 2) {
            this.props.onAdd(this.state.name, this.state.salary)
            this.setState({
                name: '',
                salary: ''
            })
        }
    }

    render() {
        let namePlaceHolder = "Как его зовут?",
            salaryPlaceHolder = "З/П в $?";

        const { name, salary } = this.state

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <from className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder={namePlaceHolder}
                        name="name"
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder={salaryPlaceHolder}
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />

                    <button type="submit"
                        className='btn btn-outline-light' onClick={this.onSubmit}>Добавить</button>
                </from>
            </div>
        )
    }
}

export default EmployeesAddForm;