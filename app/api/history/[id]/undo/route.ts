import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tasks, paymentHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const historyId = parseInt(params.id, 10);
    
    const historyRows = await db.select().from(paymentHistory).where(eq(paymentHistory.id, historyId));
    if (historyRows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const historyItem = historyRows[0];

    if (historyItem.taskId) {
      const existingTaskRows = await db.select().from(tasks).where(eq(tasks.id, historyItem.taskId));
      if (existingTaskRows.length > 0 && historyItem.repeat !== 'once') {
        // Revert the date for recurring tasks
        await db.update(tasks)
          .set({ dueDate: historyItem.originalDueDate || existingTaskRows[0].dueDate })
          .where(eq(tasks.id, historyItem.taskId));
      } else {
        // Task was deleted or was one-off, so we re-create it
        await db.insert(tasks).values({
          title: historyItem.title,
          category: historyItem.category,
          dueDate: historyItem.originalDueDate || new Date().toISOString().split('T')[0],
          repeat: historyItem.repeat || 'once',
          price: historyItem.price,
          note: historyItem.note,
        });
      }
    }

    // Delete from history
    await db.delete(paymentHistory).where(eq(paymentHistory.id, historyId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to undo payment' }, { status: 500 });
  }
}
