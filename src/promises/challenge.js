const APIRequest = require('../utils/apiRequest');
const API_BASE = 'https://rickandmortyapi.com/api/';


APIRequest(API_BASE + 'character/')
    .then((response) => {
        console.log(response.info.count)
        return APIRequest(API_BASE + 'character/' + response.results[0].id);
    })
    .then((response) => {
        console.log(response.name)
        return APIRequest(response.origin.url);
    })
    .then((response) => {
        console.log(response.dimension)
    })
    .catch((error) => console.error(error));