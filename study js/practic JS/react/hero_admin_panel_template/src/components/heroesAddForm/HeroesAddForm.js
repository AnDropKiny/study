import { useFormik } from 'formik'
import { v4 as uuidv4 } from 'uuid';
import { heroCreated } from '../heroesList/heroesSlice';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { selectAll } from '../heroesFilters/filtersSlice';

const HeroesAddForm = () => {
    const { filtersLoadingStatus } = useSelector(state => state.filters);

    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    const { request } = useHttp();


    const addNewHero = (hero) => {
        dispatch(heroCreated(hero))
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero))
            .then((data) => console.log(data, "успешно отправлено"))
    }

    const getSelect = (arr, status) => {

        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (arr.length === 0) {
            return <option className="text-center mt-5">Список элементов пуст</option>
        }

        return arr.map(({ element, name }) => {
            if (element === 'all') return null;
            return <option key={element} value={element} >{name}</option>

            // <FilterElements key={uuidv4()} element={element} uuid={uuidv4} type='option' />
        })
    }


    const formik = useFormik({

        initialValues: {
            name: '',
            description: '',
            element: '',
        },
        onSubmit: value => {


            const newHero = {
                id: uuidv4(),
                name: value.name,
                description: value.description,
                element: value.element,
            }
            // console.log(JSON.stringify(value, null, 2));
            addNewHero(newHero);
            formik.values.name = ""
            formik.values.description = ""
            formik.values.element = '';
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    onChange={formik.handleChange}
                    value={formik.values.name} />

            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    onChange={formik.handleChange}
                    value={formik.values.description} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    onChange={formik.handleChange}
                    value={formik.values.element}>
                    {getSelect(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;