import { NextResponse } from 'next/server';
import { db } from '@/db';
import { paymentHistory } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const history = await db.select().from(paymentHistory).orderBy(desc(paymentHistory.paidAt));
    return NextResponse.json(history);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await db.delete(paymentHistory);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
  }
}
