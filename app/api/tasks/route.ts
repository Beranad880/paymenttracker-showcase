import { NextResponse } from 'next/server';
import { db } from '@/db';
import { tasks } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allTasks = await db.select().from(tasks).orderBy(desc(tasks.dueDate));
    return NextResponse.json(allTasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTask = await db.insert(tasks).values({
      title: body.title,
      category: body.category,
      dueDate: body.dueDate,
      repeat: body.repeat,
      price: body.price ? parseInt(body.price, 10) : null,
      note: body.note,
    }).returning();
    return NextResponse.json(newTask[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
