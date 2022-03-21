import React from 'react'
import UserMarkerIcon from '../../assets/svg/usermarker-alt.svg'
import './Marker.css'

function UserMarker() {
    return (
        <div className="marker-user-location">
            
            <img src={UserMarkerIcon} className="marker-user-icon" alt="User Location"/>
            <div className="marker-user-info">
                Your Location
            </div>
        </div>
    )
}

export default UserMarker