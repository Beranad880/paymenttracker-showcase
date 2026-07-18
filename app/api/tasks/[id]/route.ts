import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = parseInt(params.id, 10);
    await db.delete(tasks).where(eq(tasks.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const updatedTask = await db.update(tasks).set({
      title: body.title,
      category: body.category,
      dueDate: body.dueDate,
      repeat: body.repeat,
      price: body.price ? parseInt(body.price, 10) : null,
      note: body.note,
    }).where(eq(tasks.id, id)).returning();
    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}
