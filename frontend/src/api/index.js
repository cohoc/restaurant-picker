import axios from 'axios'

const url = 'http://localhost:5000/restaurants';

export const getPlaces = async (latitude, longitude) => {  
    const response = await axios.get(`${url}/${latitude}/${longitude}`)
    return (response.data);
}

export const getNext = async (latitude, longitude, token) => {
    const response = await axios.get(`${url}/${latitude}/${longitude}/${token}`);
    return (response.data);
}

export const getDetails = async (placeid) => {
    const response = await axios.get(`${url}/${placeid}`);
    return (response.data);
}