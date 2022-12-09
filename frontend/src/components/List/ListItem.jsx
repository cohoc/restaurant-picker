import React, {useContext} from 'react'
import Star from '../../assets/svg/star.svg'
import Dollar from '../../assets/svg/dollar.svg'
import './ListItem.css'

import { MapContext } from '../Context/MapContext';

function ListItem(props) {

    const { mouseHover, mouseLeave} = useContext(MapContext);

    return (
        <li className="place" 
            onMouseEnter={() => mouseHover(props.placeid)}
            onMouseLeave={() => mouseLeave()}
            >
            <h3 className="place-name">{props.name}</h3>
            <div className="place-rating">
                <div className="rating-section">
                    <p>{props.rating}</p>
                    <img
                        src={Star}
                        alt="staricon"
                        id="star-icon"
                    />
                    <span>&#183;</span>
                    <p>({props.totalratings}) reviews</p>
                </div>
            </div>

            <div className="price-section">
                <>
                    {[...Array(props.pricelevel)].map( (_, index) => (
                        <img 
                            key={index}
                            src={Dollar}
                            alt="dollaricon"
                            className="dollar"
                            > 
                        </img>
                    ))}
                </>
            </div>
            
            <div className="place-location">
                <p>{props.vicinity}</p>
            </div>
            
            { (props.open)
            ?
                <div className={props.open.open_now ? "place-open" : "place-closed"}>
                    <p>{props.open.open_now ? 'Open' : 'Closed'} </p>
                </div>
            :
                <p>Closed</p>
            }
        </li>
    )
    }

export default ListItem