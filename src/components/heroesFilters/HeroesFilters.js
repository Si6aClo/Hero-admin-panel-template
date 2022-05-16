import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { changeFilter } from "../heroesAddForm/filtersSlice";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters, activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const onChangeActiveFilter = (e) => { 
        dispatch(changeFilter(e.target.name));
    }

    const buttons = filters.map((item, i) => {
        const btnClass = classNames({
            'btn': true,
            'btn-outline-dark': item === 'all',
            'btn-danger': item === 'fire',
            'btn-primary': item === 'water',
            'btn-success': item === 'wind',
            'btn-secondary': item === 'earth',
            'active': item === activeFilter
        });

        return <button className={btnClass} name={item} onClick={onChangeActiveFilter} key={i}>{item}</button>
    })

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