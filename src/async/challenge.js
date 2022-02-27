const APIRequest = require('../utils/APIRequest')
const API_URL = 'https://rickandmortyapi.com/api/character/'

const getFromApi = async () => {
    try {
        const data1 = await APIRequest(API_URL);
        const count = data1.info.count;
        const name = data1.results[0].name;
        
        const data2 = await APIRequest(data1.results[0].origin.url);
        const dimension = data2.dimension;

        console.log(count);
        console.log(name);
        console.log(dimension);
    } catch {
        console.log(error);
    }
}
getFromApi()

