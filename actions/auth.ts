'use server';

import { dbConnect } from '@/lib/db';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

import { validateEmail } from '@/lib/auth/emailValidator';
import { sendOTPEmail } from '@/lib/auth/sendOTPEmail';
import {
  generateOTP,
  storeOTP,
  getExistingOTP,
  checkOTP,
} from '@/lib/auth/generateOtp';

interface CreateUserInput {
  email: string;
  password: string;
}

interface ActionResult {
  success: boolean;
  status: number;
  message: string;
}

export async function initiateSignup(email: string): Promise<ActionResult> {
  const normalized = email.trim().toLowerCase();

  const { valid, reason } = await validateEmail(normalized);
  if (!valid) {
    return {
      success: false,
      status: 400,
      message: reason!,
    };
  }

  const existing = getExistingOTP(normalized);
  if (existing && existing.expiresAt > Date.now()) {
    const remainingSecs = Math.ceil((existing.expiresAt - Date.now()) / 1000);
    return {
      success: false,
      status: 429,
      message: `OTP already sent. Wait ${remainingSecs}s before requesting a new one.`,
    };
  }

  const otp = generateOTP();
  storeOTP(normalized, otp);
  await sendOTPEmail(normalized, otp);

  return { success: true, status: 200, message: 'OTP sent to your email.' };
}
export default async function createUser(data: CreateUserInput) {
  try {
    const normalized = data.email.trim().toLowerCase();
    await dbConnect();
    console.log('db connected');
    const existingUser = await User.findOne({ email: normalized });
    if (existingUser) {
      console.log('email already in use');
      return {
        status: 409,
        message: 'email already in use',
      };
    }

    // const otpResult = checkOTP(normalized, data.otp);
    // if (!otpResult.success) {
    //   return { success: false, status: 400, message: otpResult.message };
    // }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    console.log('Password hashed');
    await User.create({ email: normalized, password: hashedPassword });
    console.log('6. User created:');
    return {
      success: true,
      status: 201,
      message: 'user created successfully',
    };
  } catch (error) {
    console.error('Error creating user', error);
    return { success: false, status: 500, message: 'Internal server error.' };
  }
}
