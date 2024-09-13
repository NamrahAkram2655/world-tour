import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCities } from '../Contexts/CitiesContext';

const CityItem = ({ city }) => {
    const { cityName, emoji, date, id, position } = city;

    // Defensive checks to avoid accessing undefined properties
    const latitude = position?.lat || 0;
    const longitude = position?.lng || 0;

    const { deleteCity } = useCities();

    const deleteHandler = (e) => {
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <div>
            <Link className="cityItem" to={`${id}?lat=${latitude}&long=${longitude}`}>
                <ul>
                    <li className='cityText'>{emoji} {cityName}</li>
                    <div className='date'>
                        <li className='cityText'>{new Date(date).toLocaleDateString()}</li>
                        <li id='cross' onClick={deleteHandler}>❌</li>
                    </div>
                </ul>
            </Link>
        </div>
    );
};

CityItem.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.string.isRequired,
        cityName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        notes: PropTypes.string,
        position: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
    }).isRequired,
};

export default CityItem;
