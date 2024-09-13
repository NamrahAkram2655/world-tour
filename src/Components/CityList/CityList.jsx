import CityItem from "../CityItem/CityItem"
import PropTypes from 'prop-types';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useCities } from "../Contexts/CitiesContext";

const CityList = () => {

    const {cities} = useCities();

    if (!cities.length) return <ErrorMessage message="Error empty array"/>
    return (
        <div className="cityList">
            {cities && cities.map((city) => {
                return <CityItem city={city} key={city.id} />
            })}
        </div>
    )
}

CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ).isRequired,
};

export default CityList
