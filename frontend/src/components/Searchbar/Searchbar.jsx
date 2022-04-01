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
                                    className="search-item"
                                    onClick={ () => {onPlaceSelected(item); clear()} }
                                    key={index}>
                                    <div className="item-icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="search-item-icon" viewBox="0 0 24 24">
                                            <path d="M11.513 12.38c-2.117 0-3.835-1.729-3.835-3.862 0-2.135 1.718-3.863 3.835-3.863s3.835 1.729 3.835 3.863c0 2.132-1.718 3.862-3.835 3.862m0-12.38C6.825 0 3.025 3.827 3.025 8.549c0 4.46 3.844 10.213 6.411 13.014.959 1.045 2.076 2.454 2.076 2.454s1.2-1.417 2.229-2.493C16.306 18.84 20 13.451 20 8.549 20 3.827 16.2 0 11.513 0"/>
                                        </svg>
                                    </div>
                                    <span className="searchbar-divider"></span>
                                    <p>{item.description}</p>
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