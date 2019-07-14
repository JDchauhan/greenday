const request = require('request');
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.lambda = async function (event) {
  const promise = new Promise(function (resolve, reject) {
    request('https://pureskin-dev.s3-us-west-2.amazonaws.com/export/feeds.json', { json: true }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body);
        // resolve(body[event.queryStringParameters.id]);
      }
    })
  })
  return promise
}


let response;

exports.lambdaHandler = async (event, context) => {
  try {

    let x = await this.lambda(event)
    response = {
      'statusCode': 200,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      'body': JSON.stringify({
        data: x,
        // location: ret.data.trim()
      })
    }
  } catch (err) {
    response = {
      'statusCode': 400,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      'body': JSON.stringify({
        message: "err",
        // location: ret.data.trim()
      })
    }
  }

  return response
};

