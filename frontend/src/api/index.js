import axios from 'axios'

const url = 'http://localhost:5000/restaurants';

export const getDetails = async (placeid) => {
    const response = await axios.get(`${url}/${placeid}`);
    return (response.data);
}

export const getNext = async (token) => {
    const response = await axios.get(`${url}/${token}`)
    return (response.data);
}

export const getPhotos = async (photoref, maxwidth, maxheight) => {
    const response =  await axios.get(`${url}/${photoref}/${maxwidth}/${maxheight}`);
    return (response.data);
}

export const getPlaces = async (latitude, longitude) => {  
    const response = await axios.get(`${url}/${latitude}/${longitude}`)
    return (response.data);
}