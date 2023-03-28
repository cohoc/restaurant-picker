import React from "react";
import {ReactComponent as MarkerAltIcon} from '../../../assets/svg/marker-alt.svg'
import {ReactComponent as MarkerIcon} from '../../../assets/svg/marker.svg'
import {ReactComponent as MarkerHoverIcon} from '../../../assets/svg/marker-hover.svg'
import {ReactComponent as ChevronDown} from '../../../assets/svg/chevron-down.svg'
import {ReactComponent as ChevronLeft} from '../../../assets/svg/chevron-left.svg'
import {ReactComponent as ChevronRight} from '../../../assets/svg/chevron-right.svg'
import {ReactComponent as CancelIcon} from '../../../assets/svg/cancel.svg'
import {ReactComponent as CheckmarkIcon} from '../../../assets/svg/checkmark.svg'
import {ReactComponent as ComputerIcon} from '../../../assets/svg/computer.svg'
import {ReactComponent as Dollar} from '../../../assets/svg/dollar.svg'
import {ReactComponent as LocationIcon} from '../../../assets/svg/location.svg'
import {ReactComponent as PhoneIcon} from '../../../assets/svg/phonecall.svg'
import {ReactComponent as TrashIcon} from '../../../assets/svg/trashcan.svg'

const iconType = {
    markeralt: MarkerAltIcon,
    marker: MarkerIcon,
    markerhover: MarkerHoverIcon,
    chevrondown: ChevronDown,
    chevleft: ChevronLeft,
    chevright: ChevronRight,
    cancel: CancelIcon,
    checkmark: CheckmarkIcon,
    computer: ComputerIcon,
    dollar: Dollar,
    location: LocationIcon,
    phone: PhoneIcon,
    trashcan: TrashIcon
}

const IconComponent = ({name, ...props}) => {
    let SvgIcon = iconType[name];
    return <SvgIcon {...props} />
}

export default IconComponent