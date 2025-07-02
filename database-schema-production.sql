-- 🎭 UDance Production Database Schema
-- Para aplicación de tango de Buenos Aires

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  display_name text,
  bio text,
  avatar_url text,
  phone text,
  tango_level text check (tango_level in ('beginner', 'intermediate', 'advanced', 'professional')),
  preferred_role text check (preferred_role in ('leader', 'follower', 'both')),
  location text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Venues table (lugares de Buenos Aires)
create table public.venues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text not null,
  neighborhood text,
  city text default 'Buenos Aires' not null,
  country text default 'Argentina' not null,
  phone text,
  email text,
  website text,
  instagram text,
  capacity integer,
  has_parking boolean default false,
  accessibility_features text[],
  description text,
  venue_type text check (venue_type in ('milonga', 'school', 'club', 'restaurant', 'theater', 'outdoor')),
  latitude decimal,
  longitude decimal,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Events table (eventos de tango)
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  event_type text check (event_type in ('class', 'workshop', 'milonga', 'festival', 'performance', 'practica')) not null,
  venue_id uuid references public.venues(id) on delete set null,
  organizer_id uuid references public.profiles(id) on delete cascade not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  price decimal(10,2),
  currency text default 'ARS' not null,
  max_participants integer,
  current_participants integer default 0,
  registration_required boolean default true,
  registration_deadline timestamptz,
  skill_level text check (skill_level in ('beginner', 'intermediate', 'advanced', 'all_levels')),
  dress_code text,
  special_notes text,
  image_url text,
  status text check (status in ('draft', 'published', 'cancelled', 'completed')) default 'draft',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Event registrations table
create table public.event_registrations (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  registration_date timestamptz default now() not null,
  status text check (status in ('registered', 'waitlist', 'cancelled', 'attended')) default 'registered',
  payment_status text check (payment_status in ('pending', 'paid', 'refunded')) default 'pending',
  payment_amount decimal(10,2),
  special_requests text,
  unique(event_id, user_id)
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.venues enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;

-- RLS Policies

-- Profiles policies
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Venues policies  
create policy "Anyone can view venues" on public.venues for select using (true);
create policy "Authenticated users can create venues" on public.venues for insert with check (auth.role() = 'authenticated');
create policy "Venue creators can update their venues" on public.venues for update using (auth.uid() in (
  select organizer_id from public.events where venue_id = venues.id
));

-- Events policies
create policy "Anyone can view published events" on public.events for select using (
  status = 'published' or auth.uid() = organizer_id
);
create policy "Organizers can create events" on public.events for insert with check (auth.uid() = organizer_id);
create policy "Organizers can update their events" on public.events for update using (auth.uid() = organizer_id);

-- Event registrations policies
create policy "Users can view their registrations" on public.event_registrations for select using (auth.uid() = user_id);
create policy "Users can register for events" on public.event_registrations for insert with check (auth.uid() = user_id);
create policy "Users can update their registrations" on public.event_registrations for update using (auth.uid() = user_id);
create policy "Organizers can view registrations for their events" on public.event_registrations for select using (
  auth.uid() in (select organizer_id from public.events where id = event_id)
);

-- Functions for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_updated_at before update on public.profiles for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.venues for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.events for each row execute function public.handle_updated_at();

-- Indexes for performance
create index profiles_email_idx on public.profiles(email);
create index venues_neighborhood_idx on public.venues(neighborhood);
create index events_start_date_idx on public.events(start_date);
create index events_venue_id_idx on public.events(venue_id);
create index event_registrations_event_id_idx on public.event_registrations(event_id);
create index event_registrations_user_id_idx on public.event_registrations(user_id);

