import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tasks, paymentHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { addMonths, addYears, format } from 'date-fns';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = parseInt(params.id, 10);
    
    // Fetch task
    const taskRows = await db.select().from(tasks).where(eq(tasks.id, id));
    if (taskRows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const task = taskRows[0];

    // Insert into history
    await db.insert(paymentHistory).values({
      taskId: task.id,
      title: task.title,
      category: task.category,
      price: task.price,
      originalDueDate: task.dueDate,
      repeat: task.repeat,
      note: task.note,
    });

    // Handle repeat logic
    if (task.repeat === 'once') {
      await db.delete(tasks).where(eq(tasks.id, id));
    } else {
      let nextDate = new Date(task.dueDate);
      if (task.repeat === 'monthly') {
        nextDate = addMonths(nextDate, 1);
      } else if (task.repeat === 'yearly') {
        nextDate = addYears(nextDate, 1);
      }
      
      await db.update(tasks)
        .set({ dueDate: format(nextDate, 'yyyy-MM-dd') })
        .where(eq(tasks.id, id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to pay task' }, { status: 500 });
  }
}
