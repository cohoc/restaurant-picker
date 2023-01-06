import React, {useContext} from 'react'
//import MarkerIcon from '../../assets/png/marker.png'
import Icon from '../util/Icon/Icon'
import {MapContext} from '../Context/MapContext'

import './Marker.css'

function Marker(props) {

    const {hover, mouseHover, mouseLeave} = useContext(MapContext)

    return (
        <div className="marker-location"
            onMouseEnter={() => mouseHover(props.placeid)}
            onMouseLeave={() => mouseLeave()}
        >
            <div className="marker-icon-container">

                {props.placeid === hover ? 
                    <Icon
                        name="markerhover"
                        width="28"
                        height="28"
                        className="marker-icon marker-hover"
                    />   
                :
                    <Icon
                        name="marker"
                        className="marker-icon mk-red"
                    />
                }
                
                    

                <div 
                    className={`marker-place-info ${props.placeid === hover ? 'marker-place-hover': ''} `}>
                    <p>{props.name}</p>
                </div>

            </div>
        </div>
    )
}

export default Marker