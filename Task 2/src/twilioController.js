const twilio = require('twilio');
const config = require('../config/config');

const client = new twilio(config.twilio.accountSid, config.twilio.authToken);
console.log(process.env.PERSONAL_PHONE_NUMBER,config.twilio.phoneNumber)
exports.sendIvrCall = async (req, res) => {
  try {
    await client.calls.create({
       
      to: process.env.PERSONAL_PHONE_NUMBER,
      from: config.twilio.phoneNumber,
      url: 'https://handler.twilio.com/twiml/EHd4cbe68b24e779f4bdc2acb20bc3da46' 
    }); 
  
    res.status(200).send('Call initiated.');
  } catch (error) {
    res.status(500).send(error);
  }
};
   
exports.handleIvrResponse = async (req, res) => {
  const digits = req.body.Digits;
  
  if (digits === '1') {
    await client.messages.create({
      body: `Thank you for your interest. Here is your interview link: ${process.env.INTERVIEW_LINK}`,
      from: config.twilio.phoneNumber,
      to: process.env.PERSONAL_PHONE_NUMBER
    });
  }

  res.status(200).send('<Response><Say>Thank you. Goodbye!</Say></Response>');
};
 