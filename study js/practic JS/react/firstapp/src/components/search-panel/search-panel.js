import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    searchStateTerm = (e) => {
        let term = e.target.value;
        this.setState({ term });
        this.props.searchStateTerm(term);
    }
    render() {
        return (
            <input type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value={this.state.term}
                onChange={this.searchStateTerm} />
        )
    }
}

export default SearchPanel;