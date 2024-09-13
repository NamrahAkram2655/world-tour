import PropTypes from 'prop-types';

const CountryItems = ({ country }) => {
    return (
        <div className='countries'>
            {country.emoji}{country.country}
        </div>
    );
}

CountryItems.propTypes = {
    country: PropTypes.shape({
        country: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
    }).isRequired,
};

export default CountryItems;
