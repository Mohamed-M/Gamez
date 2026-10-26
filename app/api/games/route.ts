import {NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.RAWG_KEY_API;
  const search = request.nextUrl.searchParams.get('search')


  const response = await fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic&page_size=10${search ? `&search=${search}`: ''}`
  )

  if (!response.ok) {
    return Response.json({ 'error': 'Failed to fetch games '}, { status: response.status } )
  }

  const data = await response.json();
  return Response.json(data);
}