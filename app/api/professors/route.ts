import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
    const client = new Client({
      user: process.env.NEXT_PUBLIC_DB_USER,
      host: process.env.NEXT_PUBLIC_DB_HOST,
      database: process.env.NEXT_PUBLIC_DB_NAME,
      password: process.env.NEXT_PUBLIC_DB_PASSWORD,
      port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || '5432'),
  });


    try {
      await client.connect();
      const result = await client.query('SELECT * FROM professors');
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Error fetching professors:', error);
      return NextResponse.json({ error: 'Failed to fetch professors' }, { status: 500 });
    } finally {
      await client.end();
    }
}