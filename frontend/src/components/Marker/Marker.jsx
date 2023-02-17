import React, {useContext} from 'react'
//import MarkerIcon from '../../assets/png/marker.png'
import Icon from '../util/Icon/Icon'
import {MapContext} from '../Context/MapContext'

import './Marker.css'

function Marker(props) {

    const {hover, mouseHover, mouseLeave, selected} = useContext(MapContext)

    return (
        <div className="marker-location"
            onMouseEnter={() => mouseHover(props.placeid)}
            onMouseLeave={() => mouseLeave()}
        >
            <div className="marker-icon-container">

                {props.placeid === hover || (selected.some( (element) => element.placeid === props.placeid)) 
                ? 
                    <>
                        <Icon
                            name="markerhover"
                            width="28"
                            height="28"
                            className="marker-icon marker-hover"
                        />   

                        <div 
                            className="marker-place-info marker-place-hover">
                            <p>{props.name}</p>
                        </div>
                   </> 
                :
                    <Icon
                        name="marker"
                        className="marker-icon mk-red"
                    />
                }
            

            </div>
        </div>
    )
}

export default Marker