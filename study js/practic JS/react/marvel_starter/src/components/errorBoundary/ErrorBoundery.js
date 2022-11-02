import { Component } from "react";
import ErrorMsg from "../errorMsg/ErrorMsg";
class ErrorBoundery extends Component {
    state = {
        error: false
    }
    componentDidCatch(error, errorInfo) {

        console.log(error, errorInfo)
        this.setState({ error: true })
    }
    render() {
        if (this.state.error) {
            return <ErrorMsg />
        }
        return this.props.children;
    }

}

export default ErrorBoundery;