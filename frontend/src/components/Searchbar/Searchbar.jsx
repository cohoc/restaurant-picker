import React, {useState, useEffect, useContext} from 'react'
import { MapContext } from '../Context/MapContext'
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService"
//import Autocomplete from "react-google-autocomplete";
import './Searchbar.css'

function Searchbar() {

    const {setLat, setLon, setLoading} = useContext(MapContext)
    const [search, setSearch] = useState("") 
    const [value, setValue] = useState("")
    const [holder, setHolder] = useState("")

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
        } = useGoogle({
            apiKey: process.env.REACT_APP_MAPS_KEY,
            debounce: 1000,
            options: {
                types: ["address"],
                componentRestrictions: { country: "us" }
            }
    });
        
    const onPlaceSelected = (item) => {
        setSearch(item.place_id)
        setHolder(item.description)
    };

    const clear = () => {
        setValue("")
        placePredictions.splice(0, placePredictions.length);
    }

    useEffect(() => {

        const placeDetails = () => {
            placesService?.getDetails(
                {
                    placeId: search, fields: ['geometry.location']
                },(place) => {
                        setLat(place.geometry.location.lat());
                        setLon(place.geometry.location.lng());
                        setLoading(true);
                    }
            )    
        }

        placeDetails()
        
    }, [search])

    return (
        <>
            <input
                type="text"
                value={value}
                className="searchbar"
                id="searchinput"
                placeholder={ holder ? holder : "Search"}
                onChange={(evt) => {
                    getPlacePredictions({ input: evt.target.value });
                    setValue(evt.target.value)
                }}
            />
                        
            <div className="search-predictions-container">
                {!isPlacePredictionsLoading && (
                    <ul className="search-predictions">
                        {placePredictions?.map( (item, index) => {
                            return(
                                <li 
                                    onClick={ () => {onPlaceSelected(item); clear()} }
                                    key={index}>

                                    {item.description}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Searchbar