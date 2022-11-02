import { Component } from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import "./app.css";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                // { name: "Basil Z.", salary: 800, increase: false, rise: false, id: 1 },
                // { name: "John A.", salary: 1500, increase: true, rise: false, id: 2 },
                // { name: "Egor S.", salary: 3500, increase: false, rise: true, id: 3 },
            ],
            term: '',
            filter: ""
        }
    }

    deleteEmployees = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    addNewEmployees = (name, salary) => {
        this.setState(({ data }) => {
            let id = data.length + 1
            return {
                data: data.concat({
                    name: name,
                    salary: salary,
                    increase: false,
                    rise: false,
                    id: id
                })
            }
        })
    }

    onToggleProp = (id, elem) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [elem]: !item[elem] }
                }
                return item;
            })
        }))
    }

    searchEmp = (data, term) => {
        if (term.length === 0) {
            return data;
        }
        return data.filter(items => {
            return items.name.indexOf(term) > -1
        });
    }

    searchStateTerm = (term) => {
        this.setState({ term });
    }
    searchStateStateFilter = (filter) => {
        this.setState({ filter });
    }

    filterPost = (data, filter) => {
        switch (filter) {
            case "На повышение":
                return data.filter(item => item.rise);
            case "З/П больше 1000$":
                return data.filter(item => item.salary > 1000);
            default: return data;
        }
    }

    render() {
        const { data, term, filter } = this.state;
        const searchEmp = this.searchEmp(data, term);
        const visibleData = this.filterPost(searchEmp, filter);

        return (
            <div className="app">
                <AppInfo data={data} />

                <div className="search-panel">

                    <SearchPanel searchStateTerm={this.searchStateTerm} />
                    <AppFilter searchStateStateFilter={this.searchStateStateFilter} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteEmployees}
                    onToggle={this.onToggleProp} />

                <EmployeesAddForm onAdd={this.addNewEmployees} />
            </div>
        )
    }
}
export default App; 