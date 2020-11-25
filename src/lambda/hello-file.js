const fetch = require('isomorphic-fetch')

exports.handler = (event, context, callback) => {

  const { fileURL } = event.queryStringParameters

  fetch(fileURL, { headers })
    .then(result => result.buffer())
    .then(body => callback(null, { 
      statusCode: 200, 
      headers: {
        "Content-type": "image/jpeg"
      }, 
      body: body.toString('base64'),
      isBase64Encoded: true
    }))
}
