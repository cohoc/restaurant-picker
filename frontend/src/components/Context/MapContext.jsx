import React, { createContext, useState, useEffect } from 'react';
import { getPlaces } from '../../api';
import { placestest } from '../../testing/places'

const MapContext = createContext();
const MapProvider = props => {

    const [loading, setLoading] = useState(false);
    const [hover, setHover] = useState(null);
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [loaded, setLoaded] = useState(false);
    const [places, setPlaces] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [token, setToken] = useState()
    
    const [filter, setFilter] = useState({
        rating: "",
        miles: "",
        price: ""
    })

    const routeHandler = () => {
        window.history.pushState({}, '', `/${lat},${lon}`);
    }

    const mouseHover = (placeid) => {
        setHover(placeid)
    }

    const mouseLeave = () => {
        setHover(null);
    }

    const apiIsLoaded = () => {
        setLoaded(true);
        console.log("Maps api is loaded");
    }

    useEffect( () => {

        if (!navigator.geolocation){
            console.log("Geolocation not supported by browser")
        } else {
            navigator.geolocation.getCurrentPosition(( { coords: {latitude, longitude } }) => {
            setLat(latitude);
            setLon(longitude);
            setLoading(true);
            })
        }

    }, []);

    useEffect( () => {
        if( loading ) {
            const placesHandler = async () => {
                const data = await getPlaces(lat, lon);
                setPlaces(data.results);
                setToken(data.next_page_token)
                console.log(data);
            }
            routeHandler();
            placesHandler();
            setLoading(false);
        }
    }, [loading])

    const filterClear = () => {
        setFilter({
            rating: "",
            miles: "",
            price: ""
        })
        setSorted(places);
    }

    const handleFilter = (name, type) => {
        if(type === "clear"){
            setFilter({...filter, [name]: "" });
        }
        else{
            let value =  type.replace(/ /g,'').toLowerCase();
            setFilter({...filter, [name]: value });
            //window.history.pushState({}, '', window.location.href + `?${name}=${value}`)
        }
    }

    useEffect( () =>{
        setSorted(places);
    }, [places])

    useEffect( () => {

        const sortPlaces = type => {
            const ratingtypes = {
                highestrating: 'rating',
                totalratings: 'user_ratings_total',
                price: 'price_level',
                openstatus: 'open_now',
            }
            const sortProperty = ratingtypes[type];
            const sortedarray = [...sorted].sort( (a,b) => b[sortProperty] - a[sortProperty])
            setSorted(sortedarray)
        }

        sortPlaces(filter.rating) 

    }, [filter.rating])

    useEffect( () => {
        const filterPrice = () => {
            switch(filter.price){
                case "cheap":
                    const cheap = sorted.filter(item => item.price_level === 1 || item.price_level === undefined)
                    setSorted(cheap);
                    break;

                case "moderate":
                    const moderate = sorted.filter(item => item.price_level === 2 )
                    setSorted(moderate);
                    break;

                case "expensive":
                    const expensive = sorted.filter(item => item.price_level === 3 )
                    setSorted(expensive);
                    break;

                case "priceless":
                    const priceless = sorted.filter(item => item.price_level === 4 )
                    setSorted(priceless);
                    break;

                default:
                    //do nothing
            }
        }

        filterPrice()
    }, [filter.price] )


    useEffect( ()=> {

        const filterMiles = (outerlat, outerlon, miles) => {
            const R = 3963;
            let p1 = lat * Math.PI/180;
            let p2 = outerlat * Math.PI/180;
            let deltaLon = outerlon - lon;
            let deltaLambda = (deltaLon * Math.PI) / 180;
            let d = Math.acos( Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),) * R; 
            return d;
        }

        if(filter.miles !== ""){
            const miles = filter.miles.replace(/[^0-9]/g, '');
            sorted.forEach(item => {
                
                console.log(item.name + " distance from center: " + filterMiles(item.geometry.location.lat, item.geometry.location.lng, miles))
            })
        }

    }, [filter.miles])

    return (
        <MapContext.Provider value={{
            lat,
            lon,
            loaded,
            loading,
            places,
            hover,
            sorted,
            filter,
            setFilter,
            setPlaces,
            setLat,
            setLon,
            setLoading,
            filterClear,
            handleFilter,
            mouseHover,
            mouseLeave,
            apiIsLoaded
        }}>
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContext, MapProvider};
