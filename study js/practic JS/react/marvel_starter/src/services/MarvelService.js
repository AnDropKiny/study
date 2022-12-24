import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const { procces, setProcces, request, clearError } = useHttp();

    const _getBase = 'https://gateway.marvel.com:443/v1/public/';
    const _getApiKey = 'apikey=320ff7c6ceeda2954463fb73190f424a';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_getBase}characters?limit=9&offset=${offset}&${_getApiKey}`);
        return res.data.results.map(_getTransformChar)
    }
    const getCharactersById = async (id) => {
        const res = await request(`${_getBase}characters/${id}?${_getApiKey}`);
        return _getTransformChar(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_getBase}characters?name=${name}&${_getApiKey}`);
        return res.data.results.map(_getTransformChar);
    }
    const getAllComics = async (offset = 250) => {
        const res = await request(`${_getBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_getApiKey}`);
        return res.data.results.map(_getTransformComics)

    }
    const getComics = async (id) => {
        const res = await request(`${_getBase}comics/${id}?${_getApiKey}`);
        return _getTransformComics(res.data.results[0]);
    }
    const _getTransformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _getTransformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
        }
    }
    return {
        procces,
        setProcces,
        getAllCharacters,
        getCharactersById,
        clearError,
        getAllComics,
        getComics,
        getCharacterByName
    }
}

export default useMarvelService;