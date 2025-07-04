import { createClient } from './supabase/server';

const schema = `
-- UDance Database Schema
-- Optimized for Buenos Aires dance community platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT DEFAULT 'Buenos Aires, Argentina',
  website TEXT,
  dance_styles TEXT[], -- Array of dance styles
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('class', 'workshop', 'milonga', 'festival', 'practice')) NOT NULL,
  dance_style TEXT NOT NULL,
  instructor_id UUID REFERENCES profiles(id),
  location TEXT NOT NULL,
  address TEXT,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 120,
  capacity INTEGER,
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'ARS',
  is_free BOOLEAN DEFAULT false,
  skill_level TEXT CHECK (skill_level IN ('all', 'beginner', 'intermediate', 'advanced')),
  image_url TEXT,
  external_url TEXT,
  status TEXT CHECK (status IN ('draft', 'published', 'cancelled', 'completed')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  status TEXT CHECK (status IN ('registered', 'waitlist', 'cancelled', 'attended')) DEFAULT 'registered',
  notes TEXT,
  UNIQUE(event_id, user_id)
);

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  neighborhood TEXT,
  capacity INTEGER,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  amenities TEXT[], -- Array of amenities
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add venue relationship to events (check if column exists first)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='events' AND column_name='venue_id') THEN
        ALTER TABLE events ADD COLUMN venue_id UUID REFERENCES venues(id);
    END IF;
END $$;
`;

const policies = `
-- RLS (Row Level Security) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Events policies
DROP POLICY IF EXISTS "Anyone can view published events" ON events;
DROP POLICY IF EXISTS "Instructors can manage their own events" ON events;

CREATE POLICY "Anyone can view published events" ON events FOR SELECT USING (status = 'published');
CREATE POLICY "Instructors can manage their own events" ON events FOR ALL USING (auth.uid() = instructor_id);

-- Event registrations policies
DROP POLICY IF EXISTS "Users can view their own registrations" ON event_registrations;
DROP POLICY IF EXISTS "Users can register for events" ON event_registrations;
DROP POLICY IF EXISTS "Users can update their own registrations" ON event_registrations;

CREATE POLICY "Users can view their own registrations" ON event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for events" ON event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registrations" ON event_registrations FOR UPDATE USING (auth.uid() = user_id);

-- Venues policies
DROP POLICY IF EXISTS "Anyone can view venues" ON venues;
CREATE POLICY "Anyone can view venues" ON venues FOR SELECT USING (true);
`;

const indexes = `
-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_date_time ON events(date_time);
CREATE INDEX IF NOT EXISTS idx_events_dance_style ON events(dance_style);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_instructor ON events(instructor_id);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON profiles(location);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON event_registrations(user_id);
`;

const functions = `
-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_venues_updated_at ON venues;
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;

export async function runMigration() {
  const supabase = createClient();

  try {
    console.log('🚀 Starting database migration...');

    // Execute schema
    console.log('📋 Creating tables...');
    const { error: schemaError } = await supabase.rpc('exec', { sql: schema });
    if (schemaError) {
      console.error('Schema error:', schemaError);
      throw schemaError;
    }

    // Execute policies
    console.log('🔒 Setting up security policies...');
    const { error: policiesError } = await supabase.rpc('exec', {
      sql: policies,
    });
    if (policiesError) {
      console.error('Policies error:', policiesError);
      throw policiesError;
    }

    // Execute indexes
    console.log('⚡ Creating indexes...');
    const { error: indexesError } = await supabase.rpc('exec', {
      sql: indexes,
    });
    if (indexesError) {
      console.error('Indexes error:', indexesError);
      throw indexesError;
    }

    // Execute functions and triggers
    console.log('⚙️ Setting up functions and triggers...');
    const { error: functionsError } = await supabase.rpc('exec', {
      sql: functions,
    });
    if (functionsError) {
      console.error('Functions error:', functionsError);
      throw functionsError;
    }

    console.log('✅ Migration completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error };
  }
}
