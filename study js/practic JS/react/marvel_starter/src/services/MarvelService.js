

class MarvelService {
    _getBase = 'https://gateway.marvel.com:443/v1/public/';
    _getApiKey = 'apikey=320ff7c6ceeda2954463fb73190f424a';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._getBase}characters?limit=9&offset=${offset}&${this._getApiKey}`);
        return res.data.results.map(this._getTransformChar)
    }
    getCharactersById = async (id) => {
        const res = await this.getResource(`${this._getBase}characters/${id}?${this._getApiKey}`);
        // if (res.code === 404) {
        //     return {
        //         name: "Character Not Found",
        //         description: "Not Found",
        //         thumbnail: null,
        //         homepage: null,
        //         wiki: null
        //     }
        // }
        return this._getTransformChar(res.data.results[0]);

    }
    _getTransformChar = (char) => {
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
}

export default MarvelService;