import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes, filteredHeroesSelector } from '../heroesList/heroesSlice';
import { heroDeleted } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const {heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">No hereos yet!</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;