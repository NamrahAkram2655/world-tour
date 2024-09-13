import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CountryItems from '../CountryItems/CountryItems';
import { useCities } from '../Contexts/CitiesContext';

const CountryList = () => {

    const {cities} = useCities();

    if (!cities.length) return <ErrorMessage message="Add Any City" />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else
            return arr;
    }, []); // Ensure the accumulator is initialized as an array

    return (
        <div className='countryList'>
            {countries.map((country, index) => {
                return <CountryItems country={country} key={index} />
            })}
        </div>
    );
}

CountryList.propTypes = {
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

export default CountryList;
