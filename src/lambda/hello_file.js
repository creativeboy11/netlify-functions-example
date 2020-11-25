import fetch from "node-fetch";

exports.handler = (event, context, callback) => {

  const { fileUrl } = event.queryStringParameters;
  const fileName = fileUrl.split('/').pop();
  fetch(fileUrl)
    .then(result => result.buffer())
    .then(body => callback(null, { 
      statusCode: 200, 
      headers: {
        'Content-type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=' + fileName,
      }, 
      body: body.toString('base64'),
      isBase64Encoded: true
    }));
}
