import React, {useState, useEffect, useContext} from 'react'
import { MapContext } from '../Context/MapContext'
import { getDetails } from '../../api';
import Icon from '../util/Icon/Icon'
import './Results.css'

function Results() {

    const [restaurant, setRestaurant] = useState({})
    const {results, resultHandler, selected} = useContext(MapContext); 

    const choiceHandler = async () => {
        let index = Math.floor(Math.random() * selected.length );
        let choice = selected[index].placeid;
        const data = await getDetails(choice);
        setRestaurant(data.result);
        console.log(JSON.stringify(restaurant));
    }

    useEffect(() => {
        if(results){ 
            console.log("getting rest")
            choiceHandler();

        }
        
    }, [results])

    return (
        
            <div className={`results-background ${results === false ? 'res-hidden': ''}`}>
                <div className="results-container">
                    <div className="randomize-container">
                        {(restaurant != null) ? 
                            <div className="choice-content choice-font">

                                <div className="choice-header" >
                                    <h2>{restaurant.name}</h2>
                                </div>

                                <div className="choice-info space">

                                    <div className="info-row">
                                        <Icon
                                            name="location"
                                            className="info-icon"
                                        />
                                        <p>{restaurant.formatted_address}</p>

                                    </div>

                                    <div className="info-row">
                                        <Icon
                                            name="phone"
                                            className="info-icon"
                                        />
                                        <p>{restaurant.formatted_phone_number}</p>
                                    </div>

                                    <div className="info-row">
                                        <Icon
                                            name="computer"
                                            className="info-icon"
                                        />
                                        <p>{restaurant.website}</p>
                                        
                                    </div>

                                </div>

                                {(restaurant.opening_hours != null) 
                                ? 
                                    <ul className="choice-weekdays space">
                                        {restaurant.opening_hours.weekday_text.map((weekday, index) => {
                                            return(
                                                <li key={index} className="weekday choice-subfont">
                                                    {weekday}
                                                </li>
                                            )
                                        }
                                    )}
                                    </ul>
                                : 
                                    ''
                                }
                                
                                <button 
                                    type='button'
                                    className="choice-back"
                                    onClick={ () => resultHandler()}    
                                >
                                    Return
                                </button>
                            </div>
                            
                            
                        : '' }
                    </div>
                      
                </div>
            </div>

 
    )
}

export default Results