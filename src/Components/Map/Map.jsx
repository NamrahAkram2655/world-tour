import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCities } from "../Contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { useGeolocation } from "../useGeolocation/useGeolocation";

const Map = () => {
    const [position, setPosition] = useState([51.505, -0.09]);

    const [params] = useSearchParams();

    const lat = params.get("lat");
    const lng = params.get("long");

    const { cities } = useCities();

    useEffect(() => {
        if (lat && lng) setPosition([parseFloat(lat), parseFloat(lng)]);
    }, [lat, lng]);

    const { position: positionGeolocation, getPosition } = useGeolocation();

    useEffect(function () {
        if (positionGeolocation) setPosition([positionGeolocation.lat, positionGeolocation.lng]);
    }, [positionGeolocation]);

    return (
        <div className="mapContainer">
            <button onClick={getPosition} id="locbtn">Use Your Position</button>
            <MapContainer center={position} zoom={6} scrollWheelZoom={true} className="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city =>
                    city.position ? (
                        <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                            <Popup>
                                {city.emoji} {city.cityName}
                            </Popup>
                        </Marker>
                    ): null
                )}
                <ChangeCenter position={position} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
};

const DetectClick = () => {
    const navigate = useNavigate();

    useMapEvent('click', (e) => {
        console.log(e);
        navigate(`Form?lat=${e.latlng.lat}&long=${e.latlng.lng}`);
    });
};


ChangeCenter.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;
