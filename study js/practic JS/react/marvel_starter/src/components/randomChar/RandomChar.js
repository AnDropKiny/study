import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';

import Spinner from '../spinner/Spinner';
import ErrorMsg from '../errorMsg/ErrorMsg';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,

    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        if (!char.description) {
            char.description = "There is no description for this character."
        }

        else if (char.description.length > 215) {
            char.description = char.description.substring(0, 210) + "..."
        }

        this.setState(
            {
                char,
                loading: false,
            })

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

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharactersById(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    ViewBox = ({ char }) => {
        const { name, description, thumbnail, homepage, wiki } = char;
        let objectFit = thumbnail.indexOf('image_not_available') !== -1 ? { objectFit: "contain" } : { objectFit: "cover" }
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

    render() {
        const { char, loading, error } = this.state;
        const errorMsg = error ? <ErrorMsg /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error) ? <this.ViewBox char={char} /> : null;


        return (
            <div className="randomchar">
                {errorMsg}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={error ? () => this.onErrorOff() : () => this.componentDidMount()}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

export default RandomChar;