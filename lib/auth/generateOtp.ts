import crypto from 'crypto';

interface OTPRecord {
  hash: string;
  expiresAt: number;
  attempts: number;
}

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;
const OTP_LENGTH = 6;

// In-memory store — swap for Redis in production
const otpStore = new Map<string, OTPRecord>();

export function generateOTP(): string {
  const buffer = crypto.randomBytes(4);
  const num = buffer.readUInt32BE(0) % Math.pow(10, OTP_LENGTH);
  return num.toString().padStart(OTP_LENGTH, '0');
}

export function hashOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

export function storeOTP(email: string, otp: string): void {
  otpStore.set(email, {
    hash: hashOTP(otp),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  });
}

export function getExistingOTP(email: string): OTPRecord | undefined {
  return otpStore.get(email);
}

export function deleteOTP(email: string): void {
  otpStore.delete(email);
}

export interface VerifyOTPResult {
  success: boolean;
  message: string;
}

export function checkOTP(email: string, otp: string): VerifyOTPResult {
  const record = otpStore.get(email);

  if (!record) {
    return {
      success: false,
      message: 'No OTP found for this email. Please sign up again.',
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return {
      success: false,
      message: 'OTP has expired. Please request a new one.',
    };
  }

  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    otpStore.delete(email);
    return {
      success: false,
      message: 'Too many failed attempts. Please request a new OTP.',
    };
  }

  const inputHash = Buffer.from(hashOTP(otp.trim()));
  const storedHash = Buffer.from(record.hash);

  const isMatch =
    inputHash.length === storedHash.length &&
    crypto.timingSafeEqual(inputHash, storedHash);

  if (!isMatch) {
    record.attempts += 1;
    return {
      success: false,
      message: `Invalid OTP. ${MAX_OTP_ATTEMPTS - record.attempts} attempt(s) remaining.`,
    };
  }

  otpStore.delete(email);
  return { success: true, message: 'Email verified successfully.' };
}
