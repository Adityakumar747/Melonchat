export async function POST(req) {
  const { name, email, message } = await req.json();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
