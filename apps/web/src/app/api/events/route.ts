import { NextResponse } from 'next/server';
import { createServerClient } from '@udance/shared';

export async function GET() {
  const supabase = await createServerClient();

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, date_time')
    .order('date_time', { ascending: true });

  if (error) {
    console.error('[events] fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ events });
}
