import axios from "axios";

export const fetchGoogleMapsData = async (url, query) => {
    const apiUrl = `https://maps.googleapis.com/maps${url.replace('/api/maps', '')}`;
    const response = await axios.get(apiUrl, {
        params: query,
    });
    return response.data;
};
