import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@sparsh.com' },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Database already set up', adminExists: true });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('sparsh2026', 10);
    await prisma.admin.create({
      data: {
        email: 'admin@sparsh.com',
        password: hashedPassword,
        name: 'Sparsh Admin',
      },
    });

    return NextResponse.json({ message: 'Database set up successfully! Admin created.', adminExists: true });
  } catch (error: any) {
    return NextResponse.json({
      message: 'Setup note: Run "npx prisma db push && npm run db:seed" to initialize the database.',
      error: error.message,
    }, { status: 500 });
  }
}
