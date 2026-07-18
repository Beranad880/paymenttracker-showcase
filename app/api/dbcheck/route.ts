import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { logs } from '@/db/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check database connection by running a simple query
    await db.execute(sql`SELECT 1`);
    
    // Zapsat ověření do databáze (tabulka logs)
    await db.insert(logs).values({
      action: 'dbcheck endpoint was called and verified connection',
    });
    
    return NextResponse.json(
      { 
        status: 'success', 
        message: 'Database connection is working correctly.',
        logged_in_table: 'logs'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to connect to the database.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
