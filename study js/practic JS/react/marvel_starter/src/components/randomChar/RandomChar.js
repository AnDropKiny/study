import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import setContent from '../utils/setContent';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState({});

    const { getCharactersById, clearError, procces, setProcces } = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [])


    const onCharLoaded = (char) => {
        if (!char.description) {
            char.description = "There is no description for this character."
        }

        else if (char.description.length > 215) {
            char.description = char.description.substring(0, 210) + "..."
        }
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharactersById(id)
            .then(onCharLoaded)
            .then(() => setProcces('loaded'))
    }

    function ViewBox({ data }) {
        const { name, description, thumbnail, homepage, wiki } = data;

        let objectFit = { 'objectFit': 'cover' };
        if (thumbnail) {
            if (thumbnail.indexOf('image_not_available') !== -1) {
                objectFit = { 'objectFit': "unset" }
            }
        }

        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={objectFit} />
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{description}</p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="randomchar">

            {setContent(procces, ViewBox, char)}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={() => updateChar()}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

export default RandomChar;