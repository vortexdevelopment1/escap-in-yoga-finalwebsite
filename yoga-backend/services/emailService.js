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

  pooledTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    pool: true, // Keep connection hot & alive
    maxConnections: 5,
    maxMessages: 100,
  });

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

  const transporter = getTransporter();

  // If SMTP is not yet configured in .env, log to console for development/testing
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
      message: 'SMTP credentials not configured in .env. PIN logged to server console for testing.',
    };
  }

  const mailOptions = {
    from: `"Escape in Yoga" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `${pin} is your Escape in Yoga Password Reset PIN`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; background-color: #f7f4eb; border-radius: 16px; padding: 32px; border: 1px solid #1e342720;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #1e3427; font-size: 26px; margin: 0; font-family: Georgia, serif; letter-spacing: -0.5px;">Escape in Yoga</h1>
          <p style="color: #637764; font-size: 13px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1.5px;">Student Portal Security</p>
        </div>

        <div style="background-color: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <p style="color: #1e3427; font-size: 15px; margin-top: 0; line-height: 1.5;">
            Namaste <strong>${studentName || 'Student'}</strong>,
          </p>
          <p style="color: #435b4c; font-size: 14px; line-height: 1.5;">
            We received a request to reset your student portal password. Use the verification PIN below to proceed:
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <div style="display: inline-block; background-color: #f7f4eb; border: 2px dashed #1e342740; border-radius: 10px; padding: 14px 28px;">
              <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e3427;">${pin}</span>
            </div>
            <p style="color: #8c988e; font-size: 12px; margin: 8px 0 0 0;">This PIN expires in 10 minutes.</p>
          </div>

          <p style="color: #607264; font-size: 12px; line-height: 1.4; margin-bottom: 0;">
            If you did not request this password reset, please ignore this email or contact Avani Jain via WhatsApp support.
          </p>
        </div>

        <div style="text-align: center; margin-top: 24px; color: #8c988e; font-size: 11px;">
          <p style="margin: 0;">© 2026 Escape in Yoga · Guided Live Yoga by Avani Jain</p>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Reset PIN email sent successfully to ${toEmail}:`, info.messageId);
  return { success: true, messageId: info.messageId };
};

module.exports = {
  sendResetPinEmail,
};
