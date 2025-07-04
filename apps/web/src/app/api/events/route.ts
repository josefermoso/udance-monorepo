import { NextResponse } from 'next/server';
import { createClient } from '@udance/shared/src/supabase/server';

export async function GET() {
  const supabase = await createClient();

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
