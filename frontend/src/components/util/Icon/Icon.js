import React from "react";
import {ReactComponent as MarkerAltIcon} from '../../../assets/svg/marker-alt.svg'
import {ReactComponent as MarkerIcon} from '../../../assets/svg/marker.svg'
import {ReactComponent as MarkerHoverIcon} from '../../../assets/svg/marker-hover.svg'
import {ReactComponent as ChevronDown} from '../../../assets/svg/chevron-down.svg'

const iconType = {
    markeralt: MarkerAltIcon,
    marker: MarkerIcon,
    markerhover: MarkerHoverIcon,
    chevrondown: ChevronDown,
}

const IconComponent = ({name, ...props}) => {
    let SvgIcon = iconType[name];
    return <SvgIcon {...props} />
}

export default IconComponent