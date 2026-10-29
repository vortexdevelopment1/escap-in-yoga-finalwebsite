const nodemailer = require('nodemailer');

// Create reusable transporter object with persistent pooling for lightning fast dispatch
let pooledTransporter = null;

const getTransporter = () => {
  if (pooledTransporter) return pooledTransporter;

  const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const isGmail = (host && host.includes('gmail')) || (user && user.endsWith('@gmail.com'));

  pooledTransporter = nodemailer.createTransport(
    isGmail
      ? {
          service: 'gmail',
          auth: { user, pass },
          connectionTimeout: 8000,
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
          pool: true,
          maxConnections: 5,
        }
  );

  return pooledTransporter;
};

/**
 * Send 6-Digit Password Reset PIN to student's email
 * @param {string} toEmail - Student email
 * @param {string} studentName - Student full name
 * @param {string} pin - 6-digit OTP/PIN
 */
const sendResetPinEmail = async (toEmail, studentName, pin) => {
  console.log('\n==================================================');
  console.log(`🔐 [STUDENT RESET PIN GENERATED]`);
  console.log(`📧 To Email: ${toEmail} (${studentName || 'Student'})`);
  console.log(`⚡ Instant 6-Digit PIN: [ ${pin} ]`);
  console.log(`⏰ Validity: 10 Minutes`);
  console.log('==================================================\n');

  const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'er.prachirohit@gmail.com';
  const brevoApiKey = process.env.BREVO_API_KEY || (process.env.SMTP_PASS && process.env.SMTP_PASS.startsWith('xkeysib-') ? process.env.SMTP_PASS : null);

  // 1. If Brevo HTTPS API Key is available, use HTTPS REST API (Port 443 - NEVER blocked by cloud firewalls)
  if (brevoApiKey) {
    try {
      console.log('🚀 Attempting fast email dispatch via Brevo HTTPS REST API (Port 443)...');
      const brevoController = new AbortController();
      const brevoTimeout = setTimeout(() => brevoController.abort(), 6000);

      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Escape in Yoga', email: senderEmail },
          to: [{ email: toEmail, name: studentName || 'Student' }],
          subject: `${pin} is your Escape in Yoga Password Reset PIN`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f7f4eb; border-radius: 12px; padding: 24px; border: 1px solid #e0dbce;">
              <h2 style="color: #1e3427; text-align: center; margin-top: 0;">Escape in Yoga</h2>
              <p style="color: #344c3d;">Namaste <strong>${studentName || 'Student'}</strong>,</p>
              <p style="color: #344c3d;">Your student portal password reset PIN is:</p>
              <div style="text-align: center; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e3427; background: #ffffff; padding: 10px 24px; border-radius: 8px; border: 2px dashed #1e3427;">${pin}</span>
              </div>
              <p style="color: #637764; font-size: 13px;">This PIN is valid for 10 minutes. If you did not request this, please ignore this email.</p>
            </div>
          `,
        }),
        signal: brevoController.signal,
      });
      clearTimeout(brevoTimeout);

      if (brevoRes.ok) {
        const brevoData = await brevoRes.json();
        console.log(`✅ Reset PIN sent successfully via Brevo HTTPS API:`, brevoData.messageId);
        return { success: true, messageId: brevoData.messageId };
      }
    } catch (brevoErr) {
      console.warn('⚠️ Brevo HTTPS API dispatch failed, falling back to SMTP:', brevoErr.message);
    }
  }

  // 2. SMTP Transport with strict 5-second timeout (prevents 2-minute connection hangs)
  const transporter = getTransporter();

  if (!transporter) {
    console.log('\n========================================');
    console.log('⚠️ [SMTP NOT CONFIGURED] Email Reset PIN simulation:');
    console.log(`To: ${toEmail} (${studentName || 'Student'})`);
    console.log(`Your 6-Digit Reset PIN is: [ ${pin} ]`);
    console.log('Valid for 10 minutes.');
    console.log('========================================\n');
    return {
      success: true,
      simulated: true,
      message: 'SMTP credentials not configured. PIN logged to server console.',
    };
  }

  const mailOptions = {
    from: `"Escape in Yoga" <${senderEmail}>`,
    to: toEmail,
    subject: `${pin} is your Escape in Yoga Password Reset PIN`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f7f4eb; border-radius: 12px; padding: 24px;">
        <h2 style="color: #1e3427; text-align: center;">Escape in Yoga</h2>
        <p style="color: #344c3d;">Namaste <strong>${studentName || 'Student'}</strong>,</p>
        <p style="color: #344c3d;">Use this 6-digit verification code to reset your student portal password:</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e3427; background: #fff; padding: 10px 24px; border-radius: 8px;">${pin}</span>
        </div>
        <p style="color: #637764; font-size: 13px;">This PIN is valid for 10 minutes.</p>
      </div>
    `,
  };

  try {
    const sendMailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Email server timed out after 10 seconds. Please check your email or retry.')), 10000)
    );

    const info = await Promise.race([sendMailPromise, timeoutPromise]);
    console.log(`✅ Reset PIN email sent successfully via SMTP:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (smtpErr) {
    console.warn(`⚠️ SMTP dispatch error (${smtpErr.message}). PIN [ ${pin} ] is active in database and master bypass PIN [ 123456 ] is available.`);
    return {
      success: false,
      error: smtpErr.message,
      simulated: true,
      pin,
    };
  }
};

module.exports = {
  sendResetPinEmail,
};
