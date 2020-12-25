import fetch from "node-fetch";

const getRecordFromRequest = (req) => {
  const ip = req.headers['x-forwarded-for'];
  const { clientEmail } = req.queryStringParameters;
  const userAgent = req.headers['user-agent'];

  return {
    ip,
    email: clientEmail,
    userAgent
  }
};

exports.handler = (event, context, callback) => {
  const record = getRecordFromRequest(event);
  const { fileUrl } = event.queryStringParameters;
  const fileName = fileUrl.split('/').pop();
  console.log(record);
  fetch(`${fileUrl}`, {method: 'POST', body: record})
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
