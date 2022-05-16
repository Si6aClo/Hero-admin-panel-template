import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import { addHero } from "../heroesList/heroesSlice";
import { fetchFilters } from "./filtersSlice";

import { useState, useEffect } from "react";

import { v4 as uuidv4 } from 'uuid';

import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [element, setElement] = useState('');

    const { request } = useHttp();
    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters(request));
        // eslint-disable-next-line
    }, [])

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const onChangeElement = (e) => {
        setElement(e.target.value);
    }

    const onAddHero = (e) => {
        e.preventDefault();
        const id = uuidv4();

        dispatch(addHero({
            id,
            name,
            description: text,
            element
        }));
        
        setName('');
        setText('');
        setElement('');
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const elements = filters.map((item, i) => {
        if (item === 'all') {
            return null;
        }
        return (
            <option value={item} key={i}>{item}</option>
        )
    })

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={onChangeName}
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    value={text}
                    onChange={onChangeText}
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    onChange={onChangeElement}
                    value={element}>
                    <option >Я владею элементом...</option>
                    {elements}
                </select>
            </div>

            <button
                className="btn btn-primary"
                onClick={onAddHero}>
                Создать</button>
        </form>
    )
}

export default HeroesAddForm;