import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useCities } from "../Contexts/CitiesContext";

const Form = () => {
    const { createCity } = useCities();
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1); // Go back one page
    };

    const [params] = useSearchParams();
    const lat = params.get("lat");
    const lng = params.get("long");

    useEffect(() => {
        if (!lat || !lng) return;

        async function fetchCityData() {
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data);

                setCity(data.city || data.locality || "Unknown location");

                setCountry(data.country || "Unknown country");

                setDate(data.date ? new Date(data.date).toISOString().split('T')[0] : ""); // Format date for input

                if (!data.countryCode) throw new Error("That doesn't seem to be a city, click somewhere else 🌝");
            }
            catch (err) {
                setError(err.message);
                console.log(error);
            }
        }

        fetchCityData();
    }, [lat, lng]);

    const addHandler = () => {

        if (!city || !date) return;

        const newCity = {
            "cityName": city,
            "country": country,
            emoji: '⛳',
            date,
            "notes": note,
            position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
            },

            id: Date.now().toString(), // Generate a unique ID if necessary
        };

        createCity(newCity);
        console.log(newCity);
        navigate("/AppLayout/Cities");
    };

    return (
        <div className="login-htmlForm">
            {(!lat || !lng) ? (
                <ErrorMessage message="Start by clicking somewhere in the map" />
            ) : (
                <>
                    <h2>Form</h2>
                    <div className="htmlForm" >
                        <div className="htmlForm-group">
                            <label>City Name</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </div>
                        <div className="htmlForm-group">
                            <label>When did you go to?</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <div className="htmlForm-group">
                            <label>Notes about your trip to</label>
                            <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>
                        <div className="buttons">
                            <button type="button" onClick={navigateBack}>&larr; Back</button>
                            <button type="button" onClick={addHandler}>Add</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Form;
