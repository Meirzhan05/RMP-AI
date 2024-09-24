import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    const { userId, professorId, professorSummaryJSON } = await req.json();
    try {
        const bookmark = await prisma.bookmark.create({
            data: {
                user_id: userId,
                professor_id: professorId,
                summary: professorSummaryJSON,
            },
        });
        return NextResponse.json({ id: bookmark.id });
    } catch (error) {
        console.error('Error saving bookmark:', error);
        return NextResponse.json({ error: 'Failed to save bookmark' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: { user_id: userId },
            include: { professor: true },
        });

        return NextResponse.json(bookmarks);
    } catch (error) {
        console.error('Error retrieving bookmarks:', error);
        return NextResponse.json({ error: 'Failed to retrieve bookmarks' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { professorId } = await req.json(); 

    try {
        const result = await prisma.bookmark.deleteMany({
            where: { professor_id: professorId },
        });

        if (result.count === 0) {
            return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 });
    }
}