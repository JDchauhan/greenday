const request = require('request');

exports.lambda = async function (event) {
  const promise = new Promise(function (resolve, reject) {
    request('https://pureskin-dev.s3-us-west-2.amazonaws.com/export/feeds.json', { json: true }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body[event.queryStringParameters.id]);
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
      'data': JSON.stringify({
        message: x,
        // location: ret.data.trim()
      })
    }
  } catch (err) {
    response = {
      'statusCode': 400,
      'body': JSON.stringify({
        data: "err",
        // location: ret.data.trim()
      })
    }
  }

  return response
};


// let response;

// /**
//  *
//  * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
//  * @param {Object} event - API Gateway Lambda Proxy Input Format
//  *
//  * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
//  * @param {Object} context
//  *
//  * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
//  * @returns {Object} object - API Gateway Lambda Proxy Output Format
//  * 
//  */

// exports.handler = async function (event) {
//     const promise = new Promise(function (resolve, reject) {
//         http.get("http://pureskin-dev.s3-us-west-2.amazonaws.com/export/feeds.json", (res) => {
//             resolve(res.statusCode)
//         }).on('error', (e) => {
//             reject(Error(e))
//         })
//     })
//     return promise
// }

// exports.lambdaHandler = async (event, context) => {
//     try {

//         // const ret = await axios(url);
//         // console.log(__dirname)


//           console.log('start request to ' + event.url)
//           http.get("http://pureskin-dev.s3-us-west-2.amazonaws.com/export/feeds.json", function(res) {
//             console.log("Got response: " + res.statusCode);
//             context.succeed();
//           }).on('error', function(e) {
//             console.log("Got error: " + e.message);
//             context.done(null, 'FAILURE');
//           });

//           console.log('end request to ' + event.url);

//         // request('https://pureskin-dev.s3-us-west-2.amazonaws.com/export/feeds.json', function (error, response, body) {
//         //     if (!error && response.statusCode == 200) {
//         //         var importedJSON = JSON.parse(body);
//         //         console.log(importedJSON);
//         //         response = {
//         //             'statusCode': 200,
//         //             'body': JSON.stringify({
//         //                 message: "__filename",
//         //                 // location: ret.data.trim()
//         //             })
//         //         }

//         //     }else{
//         //         response = {
//         //             'statusCode': 400,
//         //             'body': JSON.stringify({
//         //                 message: "error",
//         //                 // location: ret.data.trim()
//         //             })
//         //         }        
//         //     }
//         // })
//         // console.log(rawdata)
//         console.log("hei")
//         response = {
//             'statusCode': 200,
//             'body': JSON.stringify({
//                 message: "__filename",
//                 // location: ret.data.trim()
//             })
//         }
//     } catch (err) {
//         return err;
//         console.log(err);
//     }

//     return response
// };
