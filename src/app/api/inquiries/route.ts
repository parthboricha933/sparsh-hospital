import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

// POST - Submit new inquiry (public, from appointment form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, department, doctor, date, time, message } = body;

    if (!name || !phone || !department || !date) {
      return NextResponse.json(
        { error: 'Name, phone, department, and date are required' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        department,
        doctor: doctor || null,
        date,
        time: time || null,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('Create inquiry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - List all inquiries (admin only)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    await jwtVerify(token, secret);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { department: { contains: search } },
        { doctor: { contains: search } },
      ];
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const stats = {
      total: await prisma.inquiry.count(),
      new: await prisma.inquiry.count({ where: { status: 'new' } }),
      read: await prisma.inquiry.count({ where: { status: 'read' } }),
      replied: await prisma.inquiry.count({ where: { status: 'replied' } }),
    };

    return NextResponse.json({ inquiries, stats });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
