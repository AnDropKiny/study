
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { activeFilterChanged, fetchFilters, selectAll } from './filtersSlice'
import store from '../../store';


const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);

    const filters = selectAll(store.getState())
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters())
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Идёт загрузка...</h5>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilterList = (arr) => {
        console.log('render filters')
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтров пока нет</h5>
        }

        return arr.map(({ name, element, style }) => {

            const btnClass = classNames('btn', style, {
                'active': element === activeFilter
            });
            return <button
                onClick={() => dispatch(activeFilterChanged(element))}
                key={element}
                value={element}
                className={btnClass}
            >{name}
            </button>
        })
    }

    const buttons = renderFilterList(filters);
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;