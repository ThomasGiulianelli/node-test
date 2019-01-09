// Thomas Giulianelli

const fetch = require('node-fetch');

/* GET ID and calculation data to be calculated */
fetch('https://interview.adpeai.com/api/v1/get-task')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    console.log("Data: " + JSON.stringify(jsonData));
  })