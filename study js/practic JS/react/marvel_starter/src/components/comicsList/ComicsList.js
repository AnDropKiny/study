import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setContentList } from '../utils/setContent';

import Spinner from '../spinner/Spinner';

const ComicsList = () => {

    const [list, setList] = useState([]);
    const [newItemLoading, setItemLoad] = useState(false);
    const [offset, setOffset] = useState();
    const [comicsEnded, setComicsEnded] = useState(false);

    const { getAllComics, procces, setProcces } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);


    const onRequest = (offset, initial) => {
        console.log("request")
        initial ? setItemLoad(false) : setItemLoad(true);

        getAllComics(offset)
            .then(mountComicsList)
            .then(() => setProcces('loaded'))

    }
    const mountComicsList = (newComicsList) => {
        let ended = false;
        if (newComicsList < 8) {
            ended = true;
        }

        setList(list => [...list, ...newComicsList]);
        setItemLoad(false);
        setOffset(offset + 8);
        setComicsEnded(ended);

    }


    function viewComicsList(list) {
        const elements = list.map((item, i) => {
            const { id, title, thumbnail, price } = item;
            return (
                <li className="comics__item"
                    key={i + id}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img" />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {elements}
            </ul>)

    }

    const newSpinner = procces === "loading" && newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {setContentList(procces, () => viewComicsList(list), newItemLoading)}
            {newSpinner}

            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;