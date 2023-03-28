import React, {useContext} from 'react';
import {MapContext} from '../Context/MapContext'
import GoogleMapReact from 'google-map-react'
import './Map.css'
import Marker from '../Marker/Marker';
import UserMarker from '../Marker/UserMarker';

function Map() {

    const {lat,lon, sorted, apiIsLoaded} = useContext(MapContext)

    function createMapOptions(maps) {
        return {
            zoomControlOptions: {
                style: maps.ZoomControlStyle.SMALL
            },
            minZoom: 10,
            maxZoom: 16,
            gestureHandling : "cooperative",
            mapTypeControl: false,
            fullscreenControl: false
        };
    }

    return (
        <div className="map-container">
            
            { (lat && lon) && 
            
                <GoogleMapReact
                bootstrapURLKeys={{ 
                    key: process.env.REACT_APP_MAPS_KEY,
                    libraries:['places'],
                }}
                center={{ lat: lat, lng: lon}}
                zoom={14}
                options={createMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={ ({map, maps}) => apiIsLoaded() }
                >

                    <UserMarker 
                        lat={lat}
                        lng={lon} 
                        text="Your Location"
                    />   

                    
                    {sorted?.map( (place, index) => {
                        return(
                            <Marker 
                                name={place.name}
                                open={place.opening_hours}
                                placeid={place.place_id}
                                price={place.price_level}
                                rating={place.rating}
                                totalratings={place.user_ratings_total}
                                vicinity={place.vicinity}
                                key={index}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                            />
                        )
                    })}
                        
                    

                </GoogleMapReact>

            }
            
        </div>
        
    )
}

export default Map;
