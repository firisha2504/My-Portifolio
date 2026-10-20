const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  try {
    const data = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME || 'Portfolio'} <onboarding@resend.dev>`,
      to,
      subject,
      text,
      html
    });

    console.log('Email sent:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
