import './charList.scss';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import React, { Component } from 'react';
import ErrorMsg from '../errorMsg/ErrorMsg';
import Spinner from '../spinner/Spinner';


class CharList extends Component {
    state = {
        list: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }


    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.mountCharsList)
            .catch(this.onError)
    }
    onCharListLoading = () => {
        this.setState(
            {
                newItemLoading: true
            })
    }
    mountCharsList = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        this.setState(({ list, offset }) => ({
            list: [...list, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        })
        )
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onErrorOff = () => {
        this.setState({
            loading: true,
            error: false
        })
        this.updateChar();
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
        // console.log(ref)
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }


    ViewCharsList = ({ list }) => {
        const elements = list.map((item, i) => {
            const { id, name, thumbnail } = item;

            let objectFit = thumbnail.indexOf('image_not_available') !== -1 ? { objectFit: "contain" } : { objectFit: "cover" }
            return (
                <li className="char__item"
                    key={id}
                    tabIndex={0}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(id);
                        this.focusOnItem(i);
                    }
                    }
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(id);
                            this.focusOnItem(i);
                        }
                    }}
                >
                    <img src={thumbnail} alt="abyss" style={objectFit} />
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return elements;

    }

    // activeChar = (e) => {
    //     document.querySelectorAll(".char__item").forEach(item => {
    //         item.classList.remove("char__item_selected")
    //         if (e.target === item || e.target.parentElement === item) {
    //             item.classList.add("char__item_selected");
    //         }
    //     })

    // }

    render() {
        const { list, error, loading, offset, newItemLoading, charEnded } = this.state;
        const errorMsg = error ? <ErrorMsg /> : null,
            spinner = loading ? <Spinner width={'650px'} /> : null,
            newSpinner = !loading & newItemLoading ? <Spinner width={'650px'} /> : null,
            content = !(loading || error) ? <this.ViewCharsList list={list} /> : null;

        // onClick={this.activeChar}
        return (
            <div className="char__list">
                <ul className="char__grid" >
                    {errorMsg}
                    {spinner}
                    {content}
                </ul>
                {newSpinner}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
export default CharList;