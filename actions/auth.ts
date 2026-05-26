'use server';

import { dbConnect } from '@/lib/db';
import bcrypt, { genSalt } from 'bcryptjs';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { signUpSchema } from '@/schemas/signUpSchema';

interface createUserInput {
  email: string;
  password: string;
}

export default async function createUser(data: createUserInput) {
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return {
        status: 409,
        message: 'email already in use',
      };
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const user = await User.create({ ...data, password: hashedPassword });
    return {
      success: true,
      status: 201,
      message: 'user created successfully',
    };
  } catch (error) {
    console.error('Error creating user', error);
  }
}
