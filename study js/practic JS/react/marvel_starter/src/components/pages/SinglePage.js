import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBanner from '../appBanner/AppBanner';

import useMarvelService from '../../services/MarvelService';
import setContent from '../utils/setContent';


import '../pages/singleComic.scss';
const SinglePage = ({ BaseComponent, dataType }) => {
    const [data, setData] = useState({});
    const { getComics, clearError, getCharactersById, procces, setProcces } = useMarvelService();
    const { id } = useParams();


    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id)
                    .then(setData).then(() => setProcces('loaded'))
                break;
            case 'character':
                getCharactersById(id)
                    .then(setData).then(() => setProcces('loaded'))
                break;
            default: new Error("dataType incorrect")
        }
    }

    // const errorMsg = error ? <ErrorMsg /> : null,
    //     spinner = loading ? <Spinner width={'1100px'} /> : null,
    //     content = !(loading || error) ? <BaseComponent data={data} /> : null;

    return (
        <>
            <AppBanner />
            <div className="single-comic">

                {setContent(procces, BaseComponent, data)}

                <Link to={dataType === 'comic' ? '/comics' : '/'} className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}


export default SinglePage;