// importamos el modulo xmlhttprequest
const XMLHTTPRequest = require('xmlhttprequest').XMLHttpRequest;
const URL_API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  const xhttp = new XMLHTTPRequest();

  //abrimos una conexion al api
  xhttp.open('GET', url_api, true);
  // escuhamos los cambios de la conexion
  xhttp.onreadystatechange = function(event) {
    // validamos la conexicon exitosa
    if (xhttp.readyState === 4) {
      // validamos el estado http 200
      if (xhttp.status === 200) {
        // convertimos la respuesta a json e iniciamos el callback que hara uso de la info
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        // Enviamos el error que en caso de haber problemas
        const error = new Error('Error' + url_api);
        return callback(error, null);
      }
    }
  };
  // enviamos la solicitud
  xhttp.send();
}

// llamamos la funcion y pasamos la url esto devolvera toda la informacion
fetchData(URL_API, function(error1, data1) {
  
  // retornara en que url fallo y terminara la ejecucion
  if (error1) return console.log(error1);

  // En data1 se guardo la primera respuesta
  // URL concatenamos el valor que se encuentra data1.results[0].id ente caso es 1
  //la url que pasamos es https://rickandmortyapi.com/api/character/1
  fetchData(URL_API + data1.results[0].id, function(error2, data2) {

    // retornara en que url fallo y terminara la ejecucion
    if (error2) return console.log(error2);

    // data2 tiene un objeto con la respuesta de la anterior URL
    // data2 es toda la información de Rick Sanches
    // data2.origin.url es una URL que contiene el objeto https://rickandmortyapi.com/api/location/1
    fetchData(data2.origin.url, function(error3, data3) {

      // retornara en que url fallo y terminara la ejecucion
      if (error3) return console.log(error3);

      // data3 tiene como valor la respuesta de la anterior URL
      // En conclusion data1, data2 y data3 tienen diferentes valores
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);
    });
  });
});




//Version sin comentarios
const https = require("https");
const API_BASE = 'https://rickandmortyapi.com/api/';

function APIRequest(url, callback) {
    https.get(url, (res) => {
        res.setEncoding('utf8');
        if(res.statusCode === 200) {
            let body = '';
            res.on('data', (data) => {
                body += data;
            });
            res.on('end', () => { 
                callback(null, JSON.parse(body));
            });
        } else {
            const error = new Error(`REQUEST ERROR ON ${url}. Status ${res.statusCode}`);
            callback(error, null);
        };
    });
}

APIRequest(API_BASE + 'character/', (error, response) => {
    if(error) return console.error(error.message);
    APIRequest(API_BASE + 'character/' + response.results[0].id, (error2, response2) => {
        if(error2) return console.error(error2.message);
        APIRequest(response2.origin.url, (error3, response3) => {
            if(error3) return console.error(error3.message);
            console.log(response.info.count);
            console.log(response2.name);
            console.log(response3.dimension);
        })
    });
});