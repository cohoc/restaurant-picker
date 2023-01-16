import React, {useContext} from 'react'
import { MapContext } from '../Context/MapContext'
import './Selected.css'

function Selected() {

    const {selected} = useContext(MapContext);

    return (
        <>
        { selected.length > 0 &&
            <div className="selected-container">
                <div className="selected-content">

                    <p id="selected-counter">
                    {selected.length} Selected
                    </p>
                    
                </div>
            </div>
        }
        </>
          
            

        
        
  
    )
}

export default Selected