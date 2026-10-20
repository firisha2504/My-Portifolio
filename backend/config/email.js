const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const { data, error } = await resend.emails.send({
    from: `${process.env.EMAIL_FROM_NAME || 'Portfolio'} <onboarding@resend.dev>`,
    to: [to],
    subject,
    text,
    html
  });

  if (error) {
    console.error('[Resend API Error]:', JSON.stringify(error));
    throw new Error(error.message);
  }

  console.log('Email sent successfully, id:', data.id);
  return { success: true, messageId: data.id };
};

module.exports = { sendEmail };
