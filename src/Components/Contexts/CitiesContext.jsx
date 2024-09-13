import PropTypes from "prop-types";
import { useEffect, createContext, useContext, useReducer, useCallback } from "react"

const CitiesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "cities":
            return {
                ...state,
                cities: action.payload,
            }
        case "getCity":
            return {
                ...state,
                curCity: action.payload,
            }
        case "createCity":
            return {
                ...state,
                cities: [...state.cities, action.payload],
            }
        case "deleteCity":
            return {
                ...state,
                cities: state.cities.filter((city) => city.id !== action.payload),
            }
        default:
            throw new Error("Unknown action taken");
    }
}

const initialState = {
    cities: [],
    curCity: {},
}

function CitiesProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { cities, curCity } = state;


    // const [cities, setCities] = useState([]);
    // const [curCity, setCurCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {

                const res = await fetch("http://localhost:9000/cities");
                const data = await res.json();
                console.log(data);
                dispatch({ type: "cities", payload: data });
            }
            catch (error) {
                console.log("There was an error loading cities....");
            }
        }

        fetchCities();

    }, []);


    const getCity = useCallback(async function getCity(id) {

        if (Number(id) === curCity.id) return;

        try {

            const res = await fetch(`http://localhost:9000/cities/${id}`);
            const data = await res.json();
            console.log(data);
            // setCurCity(data);
            dispatch({ type: "getCity", payload: data });

        }
        catch (error) {
            console.log("There was an error loading city....");
        }
    }, [curCity.id])

    async function createCity(newCity) {
        try {

            const res = await fetch(`http://localhost:9000/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "content-type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data);
            // setCurCity(data);
            // setCities((cities) => [...cities, data])
            dispatch({ type: "createCity", payload: data });
        }
        catch (error) {
            console.log("There was an creating city....");
        }
    }

    async function deleteCity(id) {
        try {

            const res = await fetch(`http://localhost:9000/cities/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            console.log(data);
            // setCurCity(data);
            // setCities((cities) => cities.filter((city) => city.id !== id));
            dispatch({ type: "deleteCity", payload: id });

        }
        catch (error) {
            console.log("There was an deleting city....");
        }
    }

    return (

        <CitiesContext.Provider value={{
            cities,
            curCity,
            getCity,
            createCity,
            deleteCity,
        }}>
            {children}
        </CitiesContext.Provider>
    )


}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("CitiesContext was used outside the provider");
    }
    return context;
}

CitiesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export { CitiesProvider, useCities }
