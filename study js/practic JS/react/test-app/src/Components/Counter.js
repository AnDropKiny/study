import { connect } from "react-redux";
import { inc, dec, rnd, reset } from '../actions';
import { useSelector, useDispatch } from "react-redux";
import { useStore } from "react-redux";


const Counter = () => {

    const counter = useSelector(state => state.value);
    const dispatch = useDispatch();

    // const { inc, dec, rnd, reset } = dispatch(actions)

    return (
        <div className="app">
            <div className="counter">{counter}</div>
            <div className="controls">
                <button onClick={() => dispatch(inc())} className="btn btn-outline-success ">INC</button>
                <button onClick={() => dispatch(dec())} className="btn btn-outline-danger">DEC</button>
                <button onClick={() => dispatch(rnd())} className="btn btn-outline-warning">RND</button>
                <button onClick={() => dispatch(reset())} className="btn btn-outline-secondary">RESET</button>
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return { counter: state.value }
// }


// export default connect(mapStateToProps, actions)(Counter);
export default Counter;