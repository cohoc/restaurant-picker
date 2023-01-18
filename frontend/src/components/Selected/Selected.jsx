import React, {useContext} from 'react'
import { MapContext } from '../Context/MapContext'
import Icon from '../util/Icon/Icon'
import './Selected.css'

function Selected() {

    const {selected, removeAll} = useContext(MapContext);

    return (
        <>
        { selected.length > 0 &&
            <div className="selected-container">

                <div className="selected-content">   
                    <button className="selected-button cancel"
                        onClick={() => removeAll()}
                    >
                        <Icon
                            name="cancel"
                            className="selected-icon"
                        />
                    </button>

                    <p id="selected-counter">
                    {selected.length} Selected
                    </p>

                    <button className="selected-button check">
                        <Icon
                            name="checkmark"
                            className="selected-icon"
                        />
                    </button>
                </div>
            </div>
        }
        </>
          
            

        
        
  
    )
}

export default Selected