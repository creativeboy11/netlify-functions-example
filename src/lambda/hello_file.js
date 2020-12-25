import fetch from "node-fetch";
import whois from 'whois-json';

const getRecordFromRequest = async (req) => {
  const ip = req.headers['x-forwarded-for'];
  const { clientEmail } = event.queryStringParameters;
  const userAgent = req.headers['user-agent'];

  const whoisRes = await whois(ip);
  const country = whoisRes.country;
  const ispName = whoisRes.netName || whoisRes.netname;
  return {
    ip,
    email,
    userAgent,
    ispName,
    country,
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
