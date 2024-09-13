import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useCities } from '../Contexts/CitiesContext';
import { useEffect } from 'react';

const City = () => {

    const { id } = useParams();
    const { getCity, curCity } = useCities();

    useEffect(function () {
        getCity(id);
    }, [id, getCity]);  // getcity was causing infinite loop so we used useCallback to memoize getCity function 

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1); //kitna peechy jana bs ek page is liyai -1
    }

    return (
        <div className='currentCity'>
            <p className='data'>YOUR CITY NAME</p>
            <p className='curCity'>{curCity.emoji}{curCity.cityName}</p>
            <br />
            <p className='data'>YOU WENT TO {curCity.cityName} ON</p>
            <p className='curCity'>{new Date(curCity.date).toLocaleDateString()}</p>
            <p className='data'>YOUR NOTES</p>
            <p className='curCity'>{curCity.notes}</p>
            <p className='data'>Learn more</p>

            <a href={`https://en.wikipedia.org/wiki/${curCity.cityName}`} target='_blank' className='curCityLink'> Check out {curCity.cityName} On wikipedia</a>

            <div className="buttons">
                <button onClick={navigateBack}>&larr;Back</button>

            </div>

        </div>
    );
};

City.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.string.isRequired,
        cityName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        notes: PropTypes.string,
        position: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default City;
