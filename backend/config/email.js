const Brevo = require('@getbrevo/brevo');

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (to, subject, text, html) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html || `<p>${text}</p>`;
  sendSmtpEmail.sender = {
    name: process.env.EMAIL_FROM_NAME || 'Portfolio',
    email: process.env.EMAIL_USER || 'naniabdi2504@gmail.com'
  };
  sendSmtpEmail.to = [{ email: to }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully, id:', data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('[Brevo API Error]:', JSON.stringify(error));
    throw new Error(error.message || 'Failed to send email');
  }
};

module.exports = { sendEmail };
