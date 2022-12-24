import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import setContent from '../utils/setContent';
const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { getCharactersById, clearError, procces, setProcces } = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharactersById(charId)
            .then(setChar)
            .then(() => setProcces('loaded'))
    }
    return (
        <div className="char__info">
            {setContent(procces, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let objectFit = thumbnail.indexOf('image_not_available') !== -1 ? { objectFit: "contain" } : { objectFit: "cover" }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={objectFit} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {
                    // eslint-disable-next-line
                    comics.map((item, i) => {
                        if (i < 10) {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )

}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;