import { NextResponse } from 'next/server';

let notes = [
  { id: 1, content: 'HTML is easy', important: true },
  { id: 2, content: 'Browser can execute only JavaScript', important: false },
  { id: 3, content: 'GET and POST are the most important methods of HTTP protocol', important: true },
];

export async function GET() {
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  if (!body.content) {
    return NextResponse.json({ error: 'content missing' }, { status: 400 });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
  };

  notes = notes.concat(note);
  return NextResponse.json(note, { status: 201 });
}
