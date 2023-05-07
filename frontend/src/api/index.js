import axios from 'axios'

const url = `${process.env.FIREBASE_FUNCTIONS_URL}`;

export const getDetails = async (placeid) => {
    const response = await axios.get(`${url}/details/${placeid}`);
    return (response.data);
}

export const getNext = async (token) => {
    const response = await axios.get(`${url}/nextpage/${token}`)
    return (response.data);
}

export const getPhotos = async (photoref, maxwidth, maxheight) => {
    const response =  await axios.get(`${url}/${photoref}/${maxwidth}/${maxheight}`);
    return (response.data);
}

export const getPlaces = async (latitude, longitude) => {  
    const response = await axios.get(`${url}/places/${latitude}/${longitude}`)
    return (response.data);
}