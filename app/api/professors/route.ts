import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '228338mmm',
    port: 5433,
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