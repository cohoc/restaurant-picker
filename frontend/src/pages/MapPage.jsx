import React from 'react';
import List from '../components/List/List';
import Map from '../components/Map/Map';
import Results from '../components/Results/Results';
import Selected from '../components/Selected/Selected';

function MapPage() {
    return (
        
        <section className="maps-page">
            <List/>
            <Results/>
            <Selected/>
            <Map/>
            
        </section>
  
    ) 
}

export default MapPage;
