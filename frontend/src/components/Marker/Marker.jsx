import React, {useContext} from 'react'
import MarkerIcon from '../../assets/png/marker.png'
import {MapContext} from '../Context/MapContext'

import './Marker.css'

function Marker(props) {

    const {hover} = useContext(MapContext)

    return (
        <div className="marker-location">
            <div className="marker-icon-container">

                <img 
                    src={MarkerIcon} 
                    className={(props.placeid === hover) ? 'marker-icon marker-hover' : "marker-icon"} 
                    alt="Place Location"
                />

                <div 
                    className={(props.placeid === hover) ? 'marker-place-info marker-place-hover' : 'marker-place-info'}>
                    <p>{props.name}</p>
                </div>

            </div>
        </div>
    )
}

export default Marker