import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function POST(req: Request) {
    const { userId, professorId, professorSummaryJSON } = await req.json();
    console.log(userId)
    const client = new Client({
        user: process.env.NEXT_PUBLIC_DB_USER,
        host: process.env.NEXT_PUBLIC_DB_HOST,
        database: process.env.NEXT_PUBLIC_DB_NAME,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || '5432'),
    });
    try {
        await client.connect();
        const query = `
            INSERT INTO bookmarks (user_id, professor_id, summary)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const values = [userId, professorId, JSON.stringify(professorSummaryJSON)];
        const result = await client.query(query, values);
        return NextResponse.json({ id: result.rows[0].id });
    } catch (error) {
        console.error('Error saving bookmark:', error);
        return NextResponse.json({ error: 'Failed to save bookmark' }, { status: 500 });
    } finally {
        await client.end();
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    
    const client = new Client({
        user: process.env.NEXT_PUBLIC_DB_USER,
        host: process.env.NEXT_PUBLIC_DB_HOST,
        database: process.env.NEXT_PUBLIC_DB_NAME,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || '5432'),
    });
    
    try {
        await client.connect();
        const query = `
            SELECT * FROM bookmarks WHERE user_id = $1
        `;
        const values = [userId];
        const result = await client.query(query, values);
        const bookmarks = result.rows;

        const professorIds = bookmarks.map(bookmark => bookmark.professor_id);
        const professorQuery = `
            SELECT * FROM professors WHERE id = ANY($1::int[])
        `;
        const professorResult = await client.query(professorQuery, [professorIds]);

        // Combine bookmarks with professor data
        const combinedData = bookmarks.map(bookmark => {
            const professor = professorResult.rows.find(p => p.id === bookmark.professor_id);
            return { ...bookmark, professor };
        });

        return NextResponse.json(combinedData);
    } catch (error) {
        console.error('Error retrieving bookmarks:', error);
        return NextResponse.json({ error: 'Failed to retrieve bookmarks' }, { status: 500 });
    } finally {
        await client.end();
    }
}


export async function DELETE(req: Request) {
    const { professorId } = await req.json(); 

    const client = new Client({
        user: process.env.NEXT_PUBLIC_DB_USER,
        host: process.env.NEXT_PUBLIC_DB_HOST,
        database: process.env.NEXT_PUBLIC_DB_NAME,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || '5433'),
    });

    try {
        await client.connect();
        const query = `
            DELETE FROM bookmarks WHERE professor_id = $1 RETURNING id
        `;
        const values = [professorId];
        const result = await client.query(query, values);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 });
    } finally {
        await client.end();
    }
}