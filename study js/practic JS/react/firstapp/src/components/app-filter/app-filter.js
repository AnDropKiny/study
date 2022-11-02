import { Component } from 'react';
import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: ""
        }
    }
    btnActiveClass = (e) => {
        const btns = e.target.parentElement.childNodes,
            filter = e.target.textContent;
        btns.forEach(btn => {
            btn.classList.add("btn-outline-light");
            btn.classList.remove("btn-light");
        })
        if (e.target) {
            e.target.classList.remove("btn-outline-light");
            e.target.classList.add("btn-light");
        }
        this.setState({ filter });
        this.props.searchStateStateFilter(filter);
    }


    render() {
        return (
            <div className="btn-group">
                <button className="btn btn-light" type='button' onClick={this.btnActiveClass}>Все сотрудники</button>
                <button className="btn btn-outline-light" type='button' onClick={this.btnActiveClass}>На повышение</button>
                <button className="btn btn-outline-light" type='button' onClick={this.btnActiveClass}>З/П больше 1000$</button>
            </div>
        )
    }

}

export default AppFilter;