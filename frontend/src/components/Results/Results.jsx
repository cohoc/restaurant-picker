import React, {useState, useEffect, useContext, useRef} from 'react'
import { MapContext } from '../Context/MapContext'
import { getDetails } from '../../api';
import { choicetest } from '../../testing/choice';
import Dollar from '../../assets/svg/dollar.svg'
import Icon from '../util/Icon/Icon'
import './Results.css'

function Results() {

    const [day, setDay] = useState();
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState({})
    const [rating, setRating] = useState(0);
    const {results, resultHandler, selected} = useContext(MapContext); 

    const choiceHandler = async () => {
        setLoading(true);
        let index = Math.floor(Math.random() * selected.length );
        let choice = selected[index].placeid;
        //const data = await getDetails(choice);
        //setRestaurant(data.result);
        setRestaurant(choicetest)
        console.log("choice handler")
        //console.log(JSON.stringify(restaurant));
    }

    const dateHandler = () => {
        let date = new Date();
        let day = date.getDay();
        setDay(day);
        console.log("date handler")
    }

    const resizeHandler = () => {
        let rwidth = (restaurant.rating /5) * 65;
        setRating(rwidth);
        console.log(rwidth);
        setLoading(false);
        console.log("resize handler")
    }

    useEffect(() => {
        if(results){ 
            console.log("getting rest")
            choiceHandler();
 
        }
    }, [results])

    useEffect(() => {
        resizeHandler();
        dateHandler();

    }, [restaurant])

    

    return (
            <div className={`results-background ${results === false ? 'res-hidden': ''}`}>
                <div className="results-container">
                    <div className="randomize-container">
                        {(restaurant != null) ? 
                            <div className="choice-content choice-font">

                                <div className="choice-header" >
                                    <h2>{restaurant.name}</h2>
                                    <div className="choice-header-sub">
                                        <div className="choice-price">
                                            
                                            <div className="dol-pri-container">

                                                <div className="dollar-container">
                                                    {[...Array(restaurant.price_level)].map( (_, index) => (
                                                        <div 
                                                            key={index}
                                                            className="icon-container">
                                                            <img 
                                                                src={Dollar}
                                                                alt="dollaricon"
                                                                className="dollar"
                                                                > 
                                                            </img>
                                                        </div>
                                                    ))}
                                                </div>
                                                

                                                <div className="price-container">
                                                    {typeof restaurant.price_level === 'undefined' ? <p>Inexpensive</p> : null}
                                                    {restaurant.price_level === 0 ? <p>Free</p> : null}
                                                    {restaurant.price_level === 1 ? <p>Cheap Eats</p> : null } 
                                                    {restaurant.price_level === 2 ? <p>Moderate</p> : null}
                                                    {restaurant.price_level === 3 ? <p>Expensive</p> : null}
                                                    {restaurant.price_level === 4 ? <p>Fine Dining</p> : null}
                                                </div>
                                                
                                            </div>
                                            

                                            <div className="rev-container">
                                                    <span 
                                                        style={{width: rating + 'px'}}
                                                        className="fullrating">
                                                        
                                                    </span>
                                                    <p>{restaurant.user_ratings_total} Reviews</p>
                                            </div>

                                            
                                            
                                        </div>
                                        
                                        

                                    </div>
                                </div>

                                <div className="choice-content-container">
                                    <div className="choice-info space res-pad">

                                        <div className="info-row">
                                            <Icon
                                                name="location"
                                                className="info-icon"
                                            />
                                            <p>{restaurant.formatted_address}</p>
                                        </div>

                                        <div className="info-row">
                                            <Icon
                                                name="computer"
                                                className="info-icon"
                                            />
                                            <a 
                                                href={`${restaurant.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {restaurant.website}
                                            </a>
                                        </div>

                                        <div className="info-row">
                                            <Icon
                                                name="phone"
                                                className="info-icon"
                                            />
                                            <p>{restaurant.formatted_phone_number}</p>
                                        </div>

                                    </div>

                                    <div className="choice-other-info">

                                    <div className="amenities-container">
                                        <p>Delivery</p>

                                        {(restaurant.delivery === true)
                                        ?
                                            <Icon
                                                name="checkmark"
                                                fill="#00FF00"
                                                className="info-icon"
                                            />
                                        
                                            
                                        :
                                            <div className="icon-container">
                                                <Icon
                                                    name="cancel"
                                                    fill="#FF5A64" 
                                                    className="info-icon x-icon"
                                                />
                                            </div>
                                        }
                                        
                                    </div>

                                    <div className="amenities-container">
                                        <p>Takeout</p>

                                        {(restaurant.takeout === true)
                                        ?
                                            <Icon
                                                name="checkmark"
                                                fill="#00FF00"
                                                className="info-icon"
                                            />
                                        :
                                            <div className="icon-container">
                                                <Icon
                                                    name="cancel"
                                                    fill="#FF5A64" 
                                                    className="info-icon x-icon"
                                                />
                                            </div>
                                        }
                                        
                                    </div>


                                    <div className="amenities-container">
                                        <p>Dine in</p>
                                        { (restaurant.dine_in === true) 
                                        ?
                                            <Icon
                                                name="checkmark"
                                                fill="#00FF00"
                                                className="info-icon"
                                            />
                                        :
                                            <div className="icon-container">
                                                <Icon
                                                    name="cancel"
                                                    fill="#FF5A64" 
                                                    className="info-icon x-icon"
                                                />
                                            </div>
                                        }
                                        
                                    </div>

                                    <div className="amenities-container">
                                        <p>Reservable</p>

                                        {(restaurant.reservable === true)
                                        ?
                                            <Icon
                                                name="checkmark"
                                                fill="#00FF00"
                                                className="info-icon"
                                            />
                                        :
                                        
                                            <div className="icon-container">
                                                <Icon
                                                    name="cancel"
                                                    fill="#FF5A64" 
                                                    className="info-icon x-icon"
                                                />
                                            </div>
                                        }
                                        
                                    </div>
                                                    
                                    </div>

                                    {/*(restaurant.opening_hours != null) 
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
                                            */}
                                    {(restaurant.opening_hours != null) 
                                    ?
                                        <div className="choice-other-info">
                                            <p>Hours: </p>
                                            <p>{restaurant.opening_hours.weekday_text[day]}</p>
                                        </div>
                                    :
                                        ''
                                    }
                                    
                                </div>
                                
                                
                                <button 
                                    type='button'
                                    className="choice-back"
                                    onClick={ () => resultHandler()}    
                                >
                                    New Picks
                                </button>
                            </div>
                            
                            
                        : '' }
                    </div>
                      
                </div>
            </div>

 
    )
}

export default Results