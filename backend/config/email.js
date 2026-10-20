const axios = require('axios');

const sendEmail = async (to, subject, text, html) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME || 'Portfolio',
          email: 'naniabdi2504@gmail.com'
        },
        to: [{ email: to }],
        subject,
        htmlContent: html || `<p>${text}</p>`,
        textContent: text
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Email sent successfully, id:', response.data.messageId);
    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    console.error('[Brevo API Error]:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send email');
  }
};

module.exports = { sendEmail };
