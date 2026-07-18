import { pgTable, serial, text, date, integer, timestamp } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  dueDate: date('due_date').notNull(),
  repeat: text('repeat').notNull(), // "monthly" | "yearly" | "once"
  price: integer('price'),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const paymentHistory = pgTable('payment_history', {
  id: serial('id').primaryKey(),
  taskId: integer('task_id'),
  title: text('title').notNull(),
  category: text('category').notNull(),
  price: integer('price'),
  paidAt: timestamp('paid_at').defaultNow().notNull(),
  originalDueDate: date('original_due_date'),
  repeat: text('repeat'),
  note: text('note'),
});

export const logs = pgTable('logs', {
  id: serial('id').primaryKey(),
  action: text('action').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
