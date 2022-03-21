import axios from 'axios'

const url = 'http://localhost:5000/restaurants';

export const getPlaces = async (latitude, longitude) => {  
    const response = await axios.get(`${url}/${latitude}/${longitude}`)
    return (response.data);
}