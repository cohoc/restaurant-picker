import React, {useState, useContext} from 'react'
import Star from '../../assets/svg/star.svg'
import Dollar from '../../assets/svg/dollar.svg'
import Icon from '../util/Icon/Icon'
import './ListItem.css'

import { MapContext } from '../Context/MapContext';

function ListItem(props) {

    const { mouseHover, mouseLeave, removeHandler, selectHandler, selected} = useContext(MapContext);
    const [clicked, setClicked] = useState(false);
    const [focus, setFocus] = useState(false);

    return (
        <li className={`place ${focus ? 'bg-hover' : ''}`} 
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

            { (selected.some( (element) => element.place_id === props.placeid)) 
            ? 
                <div className="selector-remove-container" >
                    <button
                        className="selector-remove bg-red"
                        onClick={() => {
                            setClicked(!clicked); 
                            removeHandler(props.placeid);
                            setFocus(!focus)
                        }}
                    >
                        Remove 
                    </button>
                </div>
                
            : 
                
                <div className="place-selector-container">
                    <button 
                        className={`selector-icon-container ${focus ? 'visible' : ''}`}
                        onClick={ () => setFocus(!focus) }
                        >
                        <Icon
                            name="chevrondown"
                            className={`selector-dropdown-icon ${focus ? 'rot-x' : ''}`}
                        />
                    </button>
                    
                    <div className={`selector-dropdown-content ${focus ? 'focused': ''}`}>

                        <button
                            className="selector-button"
                            onClick={() => {selectHandler(props.placeid); setClicked(!clicked)}}
                        >
                            Select
                        </button>

                    </div>
                </div>
            }
            
        </li>
    )
    }

export default ListItem