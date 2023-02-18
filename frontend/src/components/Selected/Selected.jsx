import React, {useContext} from 'react'
import { MapContext } from '../Context/MapContext'
import './Selected.css'

function Selected() {

    const {selected, resultHandler} = useContext(MapContext);

    return (
        <>
        { selected.length > 0 &&

            <div className="selected-container">
                
                <button 
                    className="selected-button"
                    onClick={() => resultHandler()}
                    >   
                    <p>Randomize</p>
                </button>
                
            </div>

        }
        </>
          
            

        
        
  
    )
}

export default Selected