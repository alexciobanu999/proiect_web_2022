import axios from 'axios';
import { URL } from 'url';

async function get(p_url, searchAfter = null) {
    try {
        let newUrl = !searchAfter ? p_url : p_url + "/" + searchAfter;
        return (await axios.get(newUrl)).data;
    } catch (e) {
        alert(e.message + "\n\n" + "Failed GET request");
    }
}
//get(routeGetUsers)
//get(routeGetUser, username)
//get(routeGetExperience, id)
//get(routeGetExperiences)

async function getExperiencesQuery(p_url, p_username) {
    try {
        const param = new URLSearchParams({ username: p_username });
        let urlFilter = p_url + "?";
        return (await axios.get(
            `${urlFilter}${param}`
        )).data;
    } catch (e) {
        alert(e.message + "\n\n" + "Failed GET request");
    }
}
//getExperiencesQuery(routeGetExperiences, username)

async function getExperiencesFilterQuery(p_url, p_departure, p_arrival, p_vehicle) {
    try {
        const params = new URLSearchParams({ departure: p_departure, arrival: p_arrival, vehicle: p_vehicle });
        let urlFilter = p_url + "?";
        return (await axios.get(
            `${urlFilter}${params}`
        )).data;
    } catch (e) {
        alert(e.message + "\n\n" + "Failed GET request");
    }
}
//getExperiencesFilterQuery(routeGetExperiencesFilter, departure, arrival, vehicle)

async function post(p_url, item) {
    try {
        return (await axios.post(
            p_url,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        alert(e.message + "\n\n" + "Failed POST request");
    }
}
//post(routePostUser, user)
//post(routePostExperience, experience)

async function put(p_url, searchAfter, item) {
    try {
        return (await axios.put(
            p_url + "/" + searchAfter,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        alert(e.message + "\n\n" + "Failed PUT request");
    }
}
//put(routePutUser, username, user)
//put(routePutExperience, id, experience)
//put(routePutUserPassword, username, user)

async function remove(p_url, searchAfter) {
    try {
        return (await axios.delete(
            p_url + "/" + searchAfter
        )).data;
    } catch (e) {
        alert(e.message + "\n\n" + "Failed DELETE request");
    }
}
//remove(routeDeleteUser, username)
//remove(routeDeleteExperience, id)

export { get, getExperiencesQuery, getExperiencesFilterQuery, post, put, remove };