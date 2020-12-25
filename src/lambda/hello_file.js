import fetch from "node-fetch";
import geoip from 'geoip-lite';

const getRecordFromRequest = async (req) => {
  const ip = req.headers['x-forwarded-for'];
  const { clientEmail } = req.queryStringParameters;
  const userAgent = req.headers['user-agent'];

  var geo = geoip.lookup(ip);
  return {
    ip,
    email: clientEmail,
    userAgent,
    ispName,
    country: geo.country,
    city: geo.city,
  }
};

exports.handler = async (event, context, callback) => {
  const record = await getRecordFromRequest(event);
  const { fileUrl } = event.queryStringParameters;
  const fileName = fileUrl.split('/').pop();
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
