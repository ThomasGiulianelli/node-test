/* Thomas Giulianelli */

const fetch = require('node-fetch');

/* Variables for storing the response data */
let myID;
let operationRequested;
let leftOperand;
let rightOperand;

/* GET ID and calculation data to be calculated */
fetch('https://interview.adpeai.com/api/v1/get-task')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    myID = jsonData.id;
    operationRequested = jsonData.operation;
    leftOperand = jsonData.left;
    rightOperand = jsonData.right;
    return calculateResult(operationRequested, leftOperand, rightOperand);
  })
  .then(function (myResult) {
    console.log(myResult);
    let postBody = {id: myID, result: myResult};
    postResult('https://interview.adpeai.com/api/v1/submit-task', postBody);
  })

/* POST result of the calculation */
function postResult(url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
    console.log("Success:" + JSON.stringify(response))
  }).catch(error => console.log("Error:" + error))
}

function calculateResult(operation, left, right) {
  let result;

  switch(operation) {
    case "addition" : 
      result = left + right;
      break;
    case "subtraction" :
      result = left - right;
      break;
    case "multiplication" :
      result = left * right;
      break;
    case "division" :
      result = left / right;
      break;
    case "remainder" : 
      result = left % right;
  }
  return result;
}