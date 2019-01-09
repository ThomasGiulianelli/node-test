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
    console.log("Result of " + operationRequested + ": " + myResult);
    let postBody = {id: myID, result: myResult};
    postResult('https://interview.adpeai.com/api/v1/submit-task', JSON.stringify(postBody));
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
    if (response.status == 200) {
      console.log("Success: " + JSON.stringify(response));
    }
    else if (response.status == 400) {
      throw new Error("Incorrect value in result / No ID specified / Value is invalid");
    }
    else if (response.status == 500) {
      throw new Error("ID cannot be found");
    }
  }).catch(function(error) {
    console.log("Error: " + error.message);
  })
}

/* Executes the requested operation on two numbers */
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