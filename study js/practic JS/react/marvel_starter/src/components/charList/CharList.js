import './charList.scss';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { setContentList } from '../utils/setContent';

import Spinner from '../spinner/Spinner';

const CharList = (props) => {

    const [list, setList] = useState([]);
    const [newItemLoading, setItemLoad] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, procces, setProcces } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setItemLoad(false) : setItemLoad(true);

        getAllCharacters(offset)
            .then(mountCharsList)
            .then(() => setProcces('loaded'))

    }
    const mountCharsList = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }

        setList(list => [...list, ...newCharList]);
        setItemLoad(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    let itemRefs = useRef([]);

    function focusOnItem(id) {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function viewCharsList(list) {
        const elements = list.map((item, i) => {
            const { id, name, thumbnail } = item;

            let objectFit = thumbnail.indexOf('image_not_available') !== -1 ? { objectFit: "unset" } : { objectFit: "cover" };
            return (
                <li className="char__item"
                    key={id}
                    tabIndex={0}
                    ref={el => {
                        itemRefs.current[i] = el;
                    }}

                    onClick={() => {
                        props.onCharSelected(id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img src={thumbnail} alt="abyss" style={objectFit} />
                    <div className="char__name">{name}</div>
                </li>
            );
        });

        return (
            <ul className="char__grid" >
                {elements}
            </ul>)

    }


    const newSpinner = procces === "loading" && newItemLoading ? <Spinner /> : null;

    const elements = useMemo(() => {
        return setContentList(procces, () => viewCharsList(list), newItemLoading)
        // eslint-disable-next-line
    }, [procces])

    return (
        <div className="char__list">
            {elements}
            {newSpinner}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}
export default CharList;