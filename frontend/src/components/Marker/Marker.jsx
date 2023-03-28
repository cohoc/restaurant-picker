import React, {useContext, useState, useRef, useEffect} from 'react'
//import MarkerIcon from '../../assets/png/marker.png'
import Icon from '../util/Icon/Icon'
import Star from '../../assets/svg/star.svg'
import {MapContext} from '../Context/MapContext'

import './Marker.css'

function Marker(props) {

    const {hover, mouseHover, mouseLeave, removeHandler, selected, selectHandler} = useContext(MapContext);

    const markclick = useRef(null);
    const marker = useRef(null);
    const remref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [removeHover, setRemoveHover] = useState(false);
    const [removeClick, setRemoveClick] = useState(false);


    const clickHandler = () => {
        setIsOpen(!isOpen);
    }

    const headerClickHandler = () => {
        setRemoveClick(!removeClick);
    }

    useEffect(() => {

        const markerClick = (e) => {
            if ( isOpen && markclick.current && !markclick.current.contains(e.target) && !marker.current.contains(e.target)){
                setIsOpen(false);
            }   
        }
        
        document.addEventListener("mousedown", markerClick);
  
        return () => {
            document.removeEventListener("mousedown", markerClick);
        }

    }, [isOpen]);

    useEffect(() => {

        const remClickHandler = (e) => {
            if(removeClick && remref.current && !remref.current.contains(e.target)){
                setRemoveClick(false);
                console.log("cliked outside remove")
            }

        }

        document.addEventListener("mousedown", remClickHandler);

        return () => {
            document.removeEventListener("mousedown", remClickHandler)
        }

    }, [removeClick])

    return (
        <div className="marker-location"
            ref={marker}
            onMouseEnter={() => mouseHover(props.placeid)}
            onMouseLeave={() => mouseLeave()}
        >
            <div 
                
                className="marker-icon-container"
                onClick={() => clickHandler()}
                >

                { isOpen || props.placeid === hover || (selected.some( (element) => element.placeid === props.placeid)) 
                ? 
                
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
                

            </div>

            <div     
                ref={markclick}
                className={
                    `marker-place-info marker-place-hover
                    ${ (isOpen || props.placeid === hover || (selected.some( (element) => element.placeid === props.placeid))) 
                    ? 
                        'show'
                    :
                        'none'
                    }`}
                >
                <div 
                    className={`marker-place-header ${removeHover ? "marker-hr" : "marker-hw"}`}
                >
                    <p>{props.name}</p>
                </div>

                {(selected.some( (element) => element.placeid === props.placeid ))
                ?
                    <div 
                        
                        className="marker-selected-container"
                        onMouseEnter={() => setRemoveHover(true)}
                        onMouseLeave={() => setRemoveHover(false)}
                        onClick={() => headerClickHandler()}
                    >
                        <button 
                            ref={remref}
                            className={`marker-selected-remove ${removeClick ? 'width-100' : 'width-0'}`}
                            //style={ removeClick ? { width: '100%' } : {width: '0%'} }
                            onClick={ () => 
                                {
                                    setRemoveClick(false);
                                    setRemoveHover(false);
                                    removeHandler(props.placeid);
                                }}
                            >
                            <Icon 
                                className="marker-remove-button"
                                name="trashcan"
                            />
                        </button>

                    </div>
                :
                    <div  className={`marker-info-content ${isOpen ? 'open' : 'closed'}`}>
                        <span className="border"></span>
                        <div className="marker-info">
                            <p>{props.rating}</p>
                            <img
                                src={Star}
                                id="star-icon"
                            />
                        </div>
                        
                        <div className="marker-info">
                            <p id="marker-ratings">{props.totalratings}</p>
                            <p>Reviews</p>
                        </div>

                        <div className="marker-info">
                            
                            {[...Array(props.price)].map( (_, index) => (
                                <Icon 
                                    key={index}
                                    name="dollar"
                                    className="dollar"
                                />
                            ))}
                            
                        </div>

                        <div className="marker-vicinity">
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

                        <div className="marker-selector-container">
                            <button
                                className="marker-selector-button"
                                onClick={ () => 
                                    {
                                        setIsOpen(false);
                                        selectHandler(props.placeid);
                                    }
                                }
                            >
                                Select
                            </button>
                        </div>

                    </div>
                }
                
                
                

                
            </div>
        </div>
    )
}

export default Marker