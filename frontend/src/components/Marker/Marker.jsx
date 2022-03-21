import React, {useContext} from 'react'
import MarkerIcon from '../../assets/png/marker.png'
import {MapContext} from '../Context/MapContext'

import './Marker.css'

function Marker(props) {

    const {hover} = useContext(MapContext)

    return (
        <div className="marker-location">
            
            <img 
                src={MarkerIcon} 
                className={(props.placeid === hover) ? 'marker-icon marker-hover' : "marker-icon"} 
                alt="Place Location"
            />

        </div>
    )
}

export default Marker