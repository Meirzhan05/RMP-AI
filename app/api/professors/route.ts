import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const professors = await prisma.professor.findMany();
        return NextResponse.json(professors);
    } catch (error) {
        console.error('Error fetching professors:', error);
        return NextResponse.json({ error: 'Failed to fetch professors' }, { status: 500 });
    }
}