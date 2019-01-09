/* Thomas Giulianelli */

const fetch = require('node-fetch');

/* Variables for storing the response data */
let myID;
let operationRequested;
let leftOperand;
let rightOperand;

console.log("Getting and submitting tasks continuously...\n");
main();

function main() {
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
      return postResult('https://interview.adpeai.com/api/v1/submit-task', JSON.stringify(postBody));
    })
    .then(function(completedSuccessfully) {
      /* Repeat the GET and POST requests after waiting a second */
      if(completedSuccessfully) {
        setTimeout(function(){main()}, 1000);
      }
      else {
        console.log("Previous operation did not complete successfully, trying again...\n");
        setTimeout(function(){main()}, 1000);
      }
    })
}

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
      console.log("Success! Server response: " + JSON.stringify(response) + "\n");
      return 1;
    }
    else if (response.status == 400) {
      throw new Error("Incorrect value in result / No ID specified / Value is invalid\n");
    }
    else if (response.status == 500) {
      throw new Error("ID cannot be found\n");
    }
  }).catch(function(error) {
    console.log("Error: " + error.message);
    return 0;
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