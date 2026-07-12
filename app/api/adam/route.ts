import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Adam je nejlepší člověk na světě!' });
}
