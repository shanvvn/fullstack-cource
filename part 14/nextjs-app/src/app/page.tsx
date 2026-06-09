export default async function Home() {
  // This is a React Server Component (RSC).
  // It fetches data securely on the server BEFORE sending HTML to the client!
  
  // We can fetch directly from our own API route or an external API.
  const res = await fetch('http://localhost:3000/api/notes', {
    // Adding no-store to force dynamic rendering for demonstration
    cache: 'no-store' 
  });
  const notes = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Part 14: Next.js App Router</h1>
      
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Notes (Fetched via Server Component)</h2>
        
        <ul className="space-y-4">
          {notes.map((note: { id: number, content: string, important: boolean }) => (
            <li 
              key={note.id} 
              className={`p-4 rounded border ${note.important ? 'border-red-500 bg-red-900/20' : 'border-gray-600 bg-gray-700'}`}
            >
              {note.content}
            </li>
          ))}
        </ul>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded">
          <p className="text-blue-200 text-sm">
            <strong>Note:</strong> This HTML was fully rendered on the server. If you view the page source, you will see the notes are already present in the HTML!
          </p>
        </div>
      </div>
    </main>
  );
}
