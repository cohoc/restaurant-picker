import React, {useState, useEffect, useRef, useContext} from 'react'
import { MapContext } from '../Context/MapContext'
import './Results.css'

function Results() {

    const resultClick = useRef();
    const [restaurant, setRestaurant] = useState({})
    const {results, resultHandler, selected} = useContext(MapContext); 

    const choiceHandler = () => {
        let choice = Math.floor(Math.random() * selected.length );
        setRestaurant(selected[choice]);
        console.log(JSON.stringify(restaurant));
    }

    const handleClick = (e) => {
        if (resultClick.current.contains(e.target)){
            return;
        }
        else{
            resultHandler();
        }
    }

    useEffect(() => {
        if(results) {
            document.addEventListener("mousedown", handleClick);
        }
        else {
            document.removeEventListener("mousedown", handleClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [results])

    return (
        
            <div className={`results-background ${results === false ? 'res-hidden': ''}`}>
                <div ref={resultClick} className="results-container">
                    <div className="randomize-container">
                        {(restaurant != null) ? 
                            <div className="randomize-choice">
                                <p className="restaurant-choice">
                                    {restaurant.name}
                                </p>
                            </div>
                        : '' }
                    </div>
                      
                    <div className="button-container">
                        <button
                            type='button'
                            className="randomize-button"
                            onClick={() => {choiceHandler()}}
                        >
                            Randomize
                        </button>
                    </div>
                </div>
            </div>

 
    )
}

export default Results