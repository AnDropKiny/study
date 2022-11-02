import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Skeleton from '../skeleton/Skeleton'
import ErrorMsg from '../errorMsg/ErrorMsg';
import Spinner from '../spinner/Spinner';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,


    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    onCharLoaded = (char) => {
        this.setState(
            {
                char,
                loading: false
            })
    }

    onCharLoading = () => {
        this.setState(
            {
                loading: true
            })
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();

        this.marvelService
            .getCharactersById(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const { char, error, loading } = this.state;
        const skeleton = error || loading || char ? null : <Skeleton />;
        const errorMsg = error ? <ErrorMsg /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMsg}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
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