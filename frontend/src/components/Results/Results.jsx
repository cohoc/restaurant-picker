import React, {useState, useEffect, useContext} from 'react'
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
    const [slide, setSlide] = useState(0);
    const {results, resultHandler, selected} = useContext(MapContext); 

    const choiceHandler = async () => {
        setLoading(true);
        let index = Math.floor(Math.random() * selected.length );
        let choice = selected[index].placeid;
        const data = await getDetails(choice);
        setRestaurant(data.result);
        //setRestaurant(choicetest)
        //console.log(JSON.stringify(restaurant));
    }

    const dateHandler = () => {
        let date = new Date();
        let day = date.getDay();
        setDay(day);
    }

    const resizeHandler = () => {
        let rwidth = (restaurant.rating /5) * 65;
        setRating(rwidth);
        setLoading(false);
    }

    const nextSlide = () => {
        setSlide( (slide + 1) % restaurant.reviews.length );
    }

    const previousSlide = () => {
        let nextSlide = slide - 1;
        if(nextSlide < 0){
            setSlide(restaurant.reviews.length - 1);
        } else {
            setSlide(nextSlide);
        }
    }

    useEffect(() => {
        if(results){ 
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
                                                            <Icon 
                                                                name="dollar"
                                                                className=" dollar results-dollar"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <span id="spacer">-</span>
                                                

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

                                                    <span id="spacer">-</span>

                                                    <p>{restaurant.user_ratings_total} Reviews</p>
                                            </div>

                                            
                                            
                                        </div>
                                        
                                        

                                    </div>
                                </div>

                                <div className="choice-info-container">
                                    <div className="choice-info space res-pad">

                                        <div className="info-row">

                                            <div className="icon-container">
                                                <Icon
                                                    name="location"
                                                    className="place-info-icon"
                                                />
                                            </div>
                                            
                                            <div className="info-text">
                                                <p>{restaurant.formatted_address}</p>
                                            </div>
                                        </div>

                                        <div className="info-row">
                                            <div className="icon-container">
                                                <Icon
                                                    name="computer"
                                                    className="place-info-icon"
                                                />
                                            </div>
                                            <div className="info-text">
                                                <a 
                                                    href={`${restaurant.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {restaurant.website}
                                                </a>
                                            </div>
                                            
                                        </div>

                                        <div className="info-row">
                                            <div className="icon-container">
                                                <Icon
                                                    name="phone"
                                                    className="place-info-icon"
                                                />
                                            </div>
                                            <div className="info-text">
                                                <p>{restaurant.formatted_phone_number}</p>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="other-info-container">
    
                                        {(restaurant.opening_hours != null)
                                        ?
                                            <div className="choice-other-info">
                                                <p className="info-topic">Hours: </p>
                                                <div className="hours-container">
                                                    <p>{restaurant.opening_hours.weekday_text[day]}</p>
                                                </div>
                                            </div>
                                        :
                                            ''
                                        }
    
                                        <div className="choice-other-info">
                                            <p className="info-topic">Amenities: </p>
    
                                            <div className="amenities-container">
                                                <div className="amenities">
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
    
                                                <div className="amenities">
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
    
    
                                                <div className="amenities">
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
    
                                                <div className="amenities">
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
    
                                        </div>
    
                                        <div className="choice-other-info">
                                            <p className="info-topic">Serves:</p>
                                            <div className="serves-container">
                                                {(restaurant.serves_breakfast === true)
                                                    ?
                                                        <p className="serveitem">Breakfast</p>
                                                    :
                                                        ''
                                                }
    
                                                {(restaurant.serves_brunch === true)
                                                    ?
                                                        <p className="serveitem">Brunch</p>
                                                    :
                                                        ''
                                                }
    
                                                {(restaurant.serves_lunch === true)
                                                    ?
                                                        <p className="serveitem">Lunch</p>
                                                    :
                                                        ''
                                                }
    
                                                {(restaurant.serves_dinner === true)
                                                    ?
                                                        <p className="serveitem">Dinner</p>
                                                    :
                                                        ''
                                                }
    
                                                {(restaurant.vegetarian_food === true)
                                                    ?
                                                        <p className="serveitem">Vegetarian Food</p>
                                                    :
                                                        ''
                                                }
    
                                                {(restaurant.serves_beer === true)
                                                    ?
                                                        <p className="serveitem">Beer</p>
                                                    :
                                                        ''
                                                }
    
                                                {(restaurant.serves_wine === true)
                                                    ?
                                                        <p className="serveitem">Wine</p>
                                                    :
                                                        ''
                                                }
                                            </div>
    
                                        </div>
                                    </div>

                                    <div className="choice-reviews-container review-font">
                                        {(typeof restaurant.reviews != 'undefined')
                                        ?
                                            <div className="review-carousel">
                                                <div className="review-carousel-track"
                                                    style={{transform: `translateX(-${slide * 100}%)`}}>
                                                    {restaurant.reviews.map((review, index) => {
                                                        return(
                                                            <div
                                                                key={index}
                                                                className="carousel-slide"
                                                            >
                                                                <div className="review-heading">
                                                                    <h2>{review.author_name}</h2>
                                                                    <div className="rev-container">
                                                                        {[...Array(review.rating)].map( (_, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className="review-star"
                                                                            >
                                                                                &#9733;
                                                                            </span>
                                                                        ))}
                                                                        <span id="spacer">-</span>
                                                                        <p>{review.relative_time_description}</p>
                                                                    </div>
                                                                </div>
                                                                
                                                                <p>{review.text}</p>
                                                            
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                <div className="carousel-buttons-container">
                                                    {[...Array(restaurant.reviews.length)].map( (_, index) => (
                                                        <button
                                                            key={index}
                                                            className={`carousel-button ${(slide === index) ? 'car-active': 'car-inactive'}`}
                                                            onClick={() => setSlide(index)}
                                                        />

                                                    ))}
                                                    
                                                    


                                                </div>

                                            </div> 
                                        :
                                            ''
                                        }
                                    </div>

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