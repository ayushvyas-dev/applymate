import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  await transporter.sendMail({
    from: `"Your App" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Your verification code',
    text: `Your OTP is: ${otp}\n\nExpires in 10 minutes. Do not share this code.`,
    html: `
      <div style="font-family: sans-serif; max-width: 420px; margin: auto; padding: 24px;">
        <h2 style="margin-bottom: 8px;">Verify your email</h2>
        <p style="color: #555;">Enter this code to complete your signup:</p>
        <div style="font-size: 34px; font-weight: bold; letter-spacing: 10px; padding: 20px;
                    background: #f5f5f5; text-align: center; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 13px;">
          Expires in 10 minutes. Never share this code with anyone.
        </p>
      </div>
    `,
  });
}
