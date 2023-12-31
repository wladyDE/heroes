import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import store from '../../store';

import {filtersChanged, fetchFilters, selectAll} from '../heroesFilters/filtersSlice'

const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const { request } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading Error</h5>
    }

    const changeActiveFilter = (name) => {
        dispatch(filtersChanged(name));
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">No filters yet!</h5>
        }

        return arr.map(({id, name, clazz}) => {
            const className = name === activeFilter ? `${clazz} active` : clazz;
            return (
              <button className={className} key={id} onClick={() => changeActiveFilter(name)}>
                {name}
              </button>
            );
        })
    }

    const elements = renderFiltersList(filters);
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter your heroes!</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;